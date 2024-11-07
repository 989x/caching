package redis

import (
	"context"
	"redis-management-system/internal/config"
)

var ctx = context.Background()

func GetAllKeys() ([]string, error) {
	return config.Rdb.Keys(ctx, "*").Result()
}

func DeleteKey(key string) error {
	return config.Rdb.Del(ctx, key).Err()
}

func AddKey(key, value string) error {
	return config.Rdb.Set(ctx, key, value, 0).Err()
}

func GetAllKeysWithCounts() (map[string]int, error) {
	keys, err := config.Rdb.Keys(ctx, "*").Result()
	if err != nil {
		return nil, err
	}

	keyCounts := make(map[string]int)

	for _, key := range keys {
		// Check the type of each key and get count based on the type
		keyType, err := config.Rdb.Type(ctx, key).Result()
		if err != nil {
			return nil, err
		}

		switch keyType {
		case "string":
			keyCounts[key] = 1 // String type has 1 item
		case "list":
			length, err := config.Rdb.LLen(ctx, key).Result()
			if err != nil {
				return nil, err
			}
			keyCounts[key] = int(length)
		case "set":
			size, err := config.Rdb.SCard(ctx, key).Result()
			if err != nil {
				return nil, err
			}
			keyCounts[key] = int(size)
		case "hash":
			size, err := config.Rdb.HLen(ctx, key).Result()
			if err != nil {
				return nil, err
			}
			keyCounts[key] = int(size)
		case "zset":
			size, err := config.Rdb.ZCard(ctx, key).Result()
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
