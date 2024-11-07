package redis

import (
	"context"
)

var ctx = context.Background()

func GetAllKeys() ([]string, error) {
	return Rdb.Keys(ctx, "*").Result()
}

func DeleteKey(key string) error {
	return Rdb.Del(ctx, key).Err()
}

func AddKey(key, value string) error {
	return Rdb.Set(ctx, key, value, 0).Err()
}

func GetAllKeysWithCounts() (map[string]int, error) {
	keys, err := Rdb.Keys(ctx, "*").Result()
	if err != nil {
		return nil, err
	}

	keyCounts := make(map[string]int)

	for _, key := range keys {
		// Check the type of each key and get count based on the type
		keyType, err := Rdb.Type(ctx, key).Result()
		if err != nil {
			return nil, err
		}

		switch keyType {
		case "string":
			keyCounts[key] = 1 // String type has 1 item
		case "list":
			length, err := Rdb.LLen(ctx, key).Result()
			if err != nil {
				return nil, err
			}
			keyCounts[key] = int(length)
		case "set":
			size, err := Rdb.SCard(ctx, key).Result()
			if err != nil {
				return nil, err
			}
			keyCounts[key] = int(size)
		case "hash":
			size, err := Rdb.HLen(ctx, key).Result()
			if err != nil {
				return nil, err
			}
			keyCounts[key] = int(size)
		case "zset":
			size, err := Rdb.ZCard(ctx, key).Result()
			if err != nil {
				return nil, err
			}
			keyCounts[key] = int(size)
		default:
			keyCounts[key] = 0 // Unknown or unsupported type
		}
	}

	return keyCounts, nil
}
