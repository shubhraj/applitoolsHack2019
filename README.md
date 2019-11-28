# visualTesting #
## Visual testing using Applitools ##
*Steps to Run:*
* In the root directory, you need to create a file ".env" which should contain your Applitools API key in format of
`APPLITOOLS_API_KEY = <your key here>`
* Run command `npm i` to install dependencies.
* Run `npm run visualTest` for visual test.
* Run `npm run traditionalTest` for treditional tests.  
#Note:# 
*The visual test suite should be run twice to see the difference between two dashboards. First with the V1 dashboard URLs
and sencond time with V2 URLS. Refer the code comments in file VisualAITests.js for more details.*
