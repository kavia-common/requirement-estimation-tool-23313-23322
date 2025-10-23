#!/bin/bash
cd /home/kavia/workspace/code-generation/requirement-estimation-tool-23313-23322/estimate_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

