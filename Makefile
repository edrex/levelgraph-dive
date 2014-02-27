app/.git:
	cd app && \
	git init .

deploy: build app/.git
	cd app && \
	git add . && \
	git commit -m "Deploy"; \
	git push -f "git@github.com:edrex/levelgraph-dive.git" master:gh-pages

build: bower-bundle app-bundle

clean: clean-bundles
	rm -f app/*.bundle.js
	rm -rf app/.git

bower-bundle:
	browserify app/lib/libs.js | uglifyjs2 > app/bower.bundle.js
app-bundle:
	browserify app/app.js | uglifyjs2 > app/app.bundle.js

dev-bower-bundle:
	browserify -d app/lib/libs.js > app/bower.bundle.js
watchify:

dev: dev-bower-bundle
	watchify -d app/app.js -o app/app.bundle.js &
	reload -bd app/