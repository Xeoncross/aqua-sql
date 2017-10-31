## MySQL / MariaDB Notes

767 bytes is the stated prefix limitation for InnoDB tables in MySQL version <= 5.6. In MySQL version 5.7 and upwards this limit has been increased to 3072 bytes. If you are using InnoDB <5.7 along with `utf8mb4` then you need to enable large prefixes.

The maximum length of a utf8mb4 character is four bytes. So you have to divide the max index prefix length of 767 bytes (soon 3072 bytes) by 4 resulting in 191.

    SET GLOBAL innodb_large_prefix = 1;

and

    [mysqld]
    innodb_large_prefix=1

## Postgres Notes
