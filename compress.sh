#!/bin/sh
YUIC=$(which yuic)
[ "$YUIC" = "" ] && YUIC=$(which echo)

$YUIC Source/moo-scroll.js > Source/moo-scroll-min.js

