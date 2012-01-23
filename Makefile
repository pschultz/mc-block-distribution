all: app.js chart.js

%.js: %.coffee
	coffee -cb $?
