#!/bin/bash

BACKEND_URL="http://localhost:3001/recepti"
FRONTEND_URL="http://localhost:80"

echo "Provjera backend servisa..."
if wget --spider --quiet "$BACKEND_URL"; then
  echo "✅ Backend radi na $BACKEND_URL"
else
  echo "❌ Backend nije dostupan na $BACKEND_URL"
  exit 1
fi

echo "Provjera frontend servisa..."
if wget --spider --quiet "$FRONTEND_URL"; then
  echo "✅ Frontend radi na $FRONTEND_URL"
else
  echo "❌ Frontend nije dostupan na $FRONTEND_URL"
  exit 1
fi

echo "✅ Svi servisi rade ispravno!"
exit 0