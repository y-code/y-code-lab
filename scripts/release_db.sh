#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
. $DIR/config.sh

read -ra params <<< "$@"
for (( i=0; i<${#params[@]}; i++))
do
    case "${params[$i]}" in
        --verbose|-v)
            verbose="-v"
            ;;
        --help|-h|*)
            echo Usage: $(basename $0) [options]
            echo
            echo Options:
            echo "  -v|--verbose           Show verbose output."
            echo
            exit
            ;;
    esac
done

export DB_ENVIRONMENT=Release

START=$SECONDS

EF_ARG="$verbose"

echo [$(($SECONDS-START))s] Step 1: Install migration to database

dotnet ef database update -p ./$DB_CONTEXT_PRJ -s ./$FACTORY_PRJ -c $DB_CONTEXT $EF_ARG $LAST_MIGRATION

echo [$(($SECONDS-START))s] Completed
