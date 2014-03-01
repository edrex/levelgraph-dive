deploy: app/.git webpack
	cd app/ && \
	git add -A . && \
	git commit -m "Deploy"; \
	git push -f "git@github.com:edrex/levelgraph-dive.git" master:gh-pages

app/.git:
	cd app && \
	git init .

clean:
	rm -f app/*.bundle.js
	rm -rf app/.git

webpack:
	webpack

dev:
	webpack --watch & \
	cd app && reload -bd