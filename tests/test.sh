#!/bin/bash
XDEBUG3="-dxdebug.mode=debug -dxdebug.start_with_request=yes" # add this to launch xdebug3
TESTCOMMAND="../vendor/phpunit/phpunit/phpunit --bootstrap bootstrap.php --color --testdox ./"
CLASS='' # empty to run all tests
[ ! -z "$1" ] && CLASS=$1 # assign the user input to the class variable if not null
if [ -z "$CLASS" ] # otherwise ask for a class
then
  read  -p "Enter the name of a class to test (omit the extension):[]" CLASSINPUT
fi
[ ! -z "$CLASSINPUT" ] && CLASS=$CLASSINPUT

php $XDEBUG3 $TESTCOMMAND"${CLASS}"