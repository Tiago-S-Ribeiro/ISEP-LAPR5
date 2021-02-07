//GET LINE PATHS DTO
const res = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Status code name has 'OK'", function () {
    pm.response.to.have.status("OK");
});

pm.test("There should be 14 line paths", function () {
    pm.expect(res.linePaths.length).to.eql(14);
});

pm.test("Line Path key match expected", function () {
    pm.expect(res.linePaths[0].key).to.eql("LinePath:1");
    pm.expect(res.linePaths[1].key).to.eql("LinePath:2");
    pm.expect(res.linePaths[2].key).to.eql("LinePath:4");
});

//GET LINE PATHS COMPLETE
const res = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Status code name has 'OK'", function () {
    pm.response.to.have.status("OK");
});

pm.test("There should be 14 nodes", function () {
    pm.expect(res.linePaths.length).to.eql(14);
});

pm.test("Line Path key match expected", function () {
    pm.expect(res.linePaths[0].key).to.eql("LinePath:1");
    pm.expect(res.linePaths[1].key).to.eql("LinePath:2");
    pm.expect(res.linePaths[2].key).to.eql("LinePath:4");
});

pm.test("Got all Id's", function () {
    pm.expect(res.linePaths[0]._id).to.eql("5fa86fc653275a29f4381de3");
    pm.expect(res.linePaths[1]._id).to.eql("5fa86fc653275a29f4381de4");
    pm.expect(res.linePaths[2]._id).to.eql("5fa86fc653275a29f4381de6");
});

//GET LINE PATHS BY ID
var query = {};
pm.request.url.query.all().forEach((param) => { query[param.key] = param.value });

var res = null;

if (query["id"] = "not_found") {
    res = query["id"];
} else {
    res = pm.response.json();
}

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Status code name has 'OK'", function () {
    pm.response.to.have.status("OK");
});

pm.test("Has correct ID", function () {
    if (query["id"] == "5fa86fc653275a29f4381de3") {
        pm.expect(res.key).to.eql("LinePath:1")
    } else if (query["id"] == "5fa86fc653275a29f4381dd2") {
        pm.expect(res.name).to.eql("LinePath:2")
    } else {
        pm.expect(res).to.eql("not_found")
    }
});