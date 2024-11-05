package redis

import (
	"context"
	"log"
	"os"

	"github.com/go-redis/redis/v8"
	"github.com/joho/godotenv"
)

var ctx = context.Background()
var rdb *redis.Client

func InitRedisClient() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	rdb = redis.NewClient(&redis.Options{
		Addr:     os.Getenv("REDIS_ADDR"),
		Password: os.Getenv("REDIS_PASSWORD"),
		DB:       0,
	})
}

func GetAllKeys() ([]string, error) {
	return rdb.Keys(ctx, "*").Result()
}

func DeleteKey(key string) error {
	return rdb.Del(ctx, key).Err()
}

func AddKey(key, value string) error {
	return rdb.Set(ctx, key, value, 0).Err()
}

func GetAllKeysWithCounts() (map[string]int, error) {
	keys, err := rdb.Keys(ctx, "*").Result()
	if err != nil {
		return nil, err
	}

	keyCounts := make(map[string]int)

	for _, key := range keys {
		// Check the type of each key
		keyType, err := rdb.Type(ctx, key).Result()
		if err != nil {
			return nil, err
		}

		// Get the count based on the key type
		switch keyType {
		case "string":
			keyCounts[key] = 1 // String has a count of 1
		case "list":
			length, err := rdb.LLen(ctx, key).Result()
			if err != nil {
				return nil, err
			}
			keyCounts[key] = int(length)
		case "set":
			size, err := rdb.SCard(ctx, key).Result()
			if err != nil {
				return nil, err
			}
			keyCounts[key] = int(size)
		case "hash":
			size, err := rdb.HLen(ctx, key).Result()
			if err != nil {
				return nil, err
			}
			keyCounts[key] = int(size)
		case "zset":
			size, err := rdb.ZCard(ctx, key).Result()
			if err != nil {
				return nil, err
			}
			keyCounts[key] = int(size)
		default:
			keyCounts[key] = 0 // Unknown type or unsupported type
		}
	}

	return keyCounts, nil
}
