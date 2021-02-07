//Get Paths
const res = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Status code name has 'OK'", function () {
    pm.response.to.have.status("OK");
});

pm.test("There should be 20 paths", function () {
    pm.expect(res.paths.length).to.eql(20);
});

pm.test("Path key match expected", function () {
    pm.expect(res.paths[0].key).to.eql("Path:1");
    pm.expect(res.paths[1].key).to.eql("Path:3");
    pm.expect(res.paths[2].key).to.eql("Path:37");
    pm.expect(res.paths[3].key).to.eql("Path:5");
    pm.expect(res.paths[4].key).to.eql("Path:8");
    pm.expect(res.paths[5].key).to.eql("Path:9");
    pm.expect(res.paths[6].key).to.eql("Path:11");
    pm.expect(res.paths[7].key).to.eql("Path:13");
    pm.expect(res.paths[8].key).to.eql("Path:24");
    pm.expect(res.paths[9].key).to.eql("Path:36");
    pm.expect(res.paths[10].key).to.eql("Path:22");
    pm.expect(res.paths[11].key).to.eql("Path:18");
    pm.expect(res.paths[12].key).to.eql("Path:20");
    pm.expect(res.paths[13].key).to.eql("Path:26");
    pm.expect(res.paths[14].key).to.eql("Path:39");
    pm.expect(res.paths[15].key).to.eql("Path:38");
    pm.expect(res.paths[16].key).to.eql("Path:34");
    pm.expect(res.paths[17].key).to.eql("Path:35");
    pm.expect(res.paths[18].key).to.eql("key_last_test2");
    pm.expect(res.paths[19].key).to.eql("PATH_TEST_2");
});

//Get a path by id
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Status code name has 'OK'", function () {
    pm.response.to.have.status("OK");
});

pm.test("Path key match expected", function () {
    pm.expect(res.path.key).to.eql("key_last_test2");
});


//Get complete paths

const res = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Status code name has 'OK'", function () {
    pm.response.to.have.status("OK");
});

pm.test("There should be 20 paths", function () {
    pm.expect(res.paths.length).to.eql(20);
});

pm.test("Path key match expected", function () {
    pm.expect(res.paths[0].key).to.eql("Path:1");
    pm.expect(res.paths[1].key).to.eql("Path:3");
    pm.expect(res.paths[2].key).to.eql("Path:37");
    pm.expect(res.paths[3].key).to.eql("Path:5");
    pm.expect(res.paths[4].key).to.eql("Path:8");
    pm.expect(res.paths[5].key).to.eql("Path:9");
    pm.expect(res.paths[6].key).to.eql("Path:11");
    pm.expect(res.paths[7].key).to.eql("Path:13");
    pm.expect(res.paths[8].key).to.eql("Path:24");
    pm.expect(res.paths[9].key).to.eql("Path:36");
    pm.expect(res.paths[10].key).to.eql("Path:22");
    pm.expect(res.paths[11].key).to.eql("Path:18");
    pm.expect(res.paths[12].key).to.eql("Path:20");
    pm.expect(res.paths[13].key).to.eql("Path:26");
    pm.expect(res.paths[14].key).to.eql("Path:39");
    pm.expect(res.paths[15].key).to.eql("Path:38");
    pm.expect(res.paths[16].key).to.eql("Path:34");
    pm.expect(res.paths[17].key).to.eql("Path:35");
    pm.expect(res.paths[18].key).to.eql("key_last_test2");
    pm.expect(res.paths[19].key).to.eql("PATH_TEST_2");
});

pm.test("Path isEmpty match expected", function () {
    pm.expect(res.paths[0].isEmpty).to.eql(false);
    pm.expect(res.paths[1].isEmpty).to.eql(false);
    pm.expect(res.paths[2].isEmpty).to.eql(true);
    pm.expect(res.paths[3].isEmpty).to.eql(false);
    pm.expect(res.paths[4].isEmpty).to.eql(false);
    pm.expect(res.paths[5].isEmpty).to.eql(false);
    pm.expect(res.paths[6].isEmpty).to.eql(false);
    pm.expect(res.paths[7].isEmpty).to.eql(false);
    pm.expect(res.paths[8].isEmpty).to.eql(false);
    pm.expect(res.paths[9].isEmpty).to.eql(true);
    pm.expect(res.paths[10].isEmpty).to.eql(false);
    pm.expect(res.paths[11].isEmpty).to.eql(false);
    pm.expect(res.paths[12].isEmpty).to.eql(false);
    pm.expect(res.paths[13].isEmpty).to.eql(false);
    pm.expect(res.paths[14].isEmpty).to.eql(true);
    pm.expect(res.paths[15].isEmpty).to.eql(true);
    pm.expect(res.paths[16].isEmpty).to.eql(true);
    pm.expect(res.paths[17].isEmpty).to.eql(true);
    pm.expect(res.paths[18].isEmpty).to.eql(false);
    pm.expect(res.paths[19].isEmpty).to.eql(false);
});