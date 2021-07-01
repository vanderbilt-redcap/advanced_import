# How to run tests

* go to the root directoy of the module
* type ```./vendor/bin/phpunit --color --testdox tests/```

### Docker users:
Tests must be run from inside the container.

Example: ```docker exec -it redcap bash```

### run from browser:

Visit ```https://{redcap_url}/redcap_v{x.y.z}/ExternalModules/?prefix=advanced_import&page=tests/index.php&pid={project_id}```