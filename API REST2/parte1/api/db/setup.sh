#!/bin/bash
set -e
service mysql start
mysql < /app/database.sql
service mysql stop