package redis

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/joho/godotenv"
)

var Rdb *redis.Client
var ctx = context.Background()

// InitRedisClient initializes the Redis client and checks connection status
func InitRedisClient() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// Configure and create Redis client
	Rdb = redis.NewClient(&redis.Options{
		Addr:     os.Getenv("REDIS_ADDR"),
		Password: os.Getenv("REDIS_PASSWORD"),
		DB:       0,
	})

	// Test the connection to Redis
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	_, err := Rdb.Ping(ctx).Result()
	if err != nil {
		log.Fatalf("Failed to connect to Redis: %v", err)
	} else {
		fmt.Println("Successfully connected to Redis")
	}
}

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
