module.exports = {
  dist: {
    options: {
      "src_folders": ["test/"],
      "output_folder": "test/results/",  
      
      "selenium" : {
        "start_process": true,
        "server_path": "node_modules/selenium-server/lib/runner/selenium-server-standalone-2.44.0.jar",
        "log_path": "test/results/",
        "host": "127.0.0.1",
        "port": 4444,
	    "cli_args": {
          "webdriver.chrome.driver": "./node_modules/.bin/chromedriver.cmd"
        }
      },
      
      "test_settings": {
        "default": {
          "launch_url": "http://localhost",
          "selenium_host": "localhost",
	      "selenium_port": 4444,
          "silent": true,
          "screenshots": {
            "enabled": false,
            "path": ""
          },
          "desiredCapabilities": {
            "browserName": "chrome",
            "javascriptEnabled": true,
            "acceptSslCerts": true
          }
        }
      }
	}
  }
};
