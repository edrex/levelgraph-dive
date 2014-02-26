app/.git:
	cd app && \
	git init .

deploy: app/.git
	cd app && \
	git add . && \
	git commit -m "Deploy"; \
	git push -f "git@github.com:edrex/levelgraph-dive.git" master:gh-pages

clean:
	rm -rf app/.git