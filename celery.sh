#!/usr/bin/env bash
#!/bin/sh

pipenv run celery -A luxe worker -l info