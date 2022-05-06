#!/bin/bash

export NODE_ENV=test
export DATABASE_CONN="postgresql://postgres:postgres@127.0.0.1:5432/postgres"


npm test
