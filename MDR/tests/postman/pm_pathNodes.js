//GET PATH NODES DTO
const res = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Status code name has 'OK'", function () {
    pm.response.to.have.status("OK");
});

pm.test("There should be 74 path nodes", function () {
    pm.expect(res.pathNodes.length).to.eql(74);
});

pm.test("Path Node key match expected", function () {
    pm.expect(res.pathNodes[0].node).to.eql("5fa86fc653275a29f4381d84");
    pm.expect(res.pathNodes[1].node).to.eql("5fa86fc653275a29f4381d83");
    pm.expect(res.pathNodes[2].node).to.eql("5fa86fc653275a29f4381d78");
});

//GET PATH NODES COMPLETE
const res = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Status code name has 'OK'", function () {
    pm.response.to.have.status("OK");
});

pm.test("There should be 74 nodes", function () {
    pm.expect(res.pathNodes.length).to.eql(74);
});

pm.test("Path Node key match expected", function () {
    pm.expect(res.pathNodes[0].node).to.eql("5fa86fc653275a29f4381d84");
    pm.expect(res.pathNodes[1].node).to.eql("5fa86fc653275a29f4381d83");
    pm.expect(res.pathNodes[2].node).to.eql("5fa86fc653275a29f4381d78");
});

pm.test("Got all Id's", function () {
    pm.expect(res.pathNodes[0]._id).to.eql("5fa86fc653275a29f4381d8d");
    pm.expect(res.pathNodes[1]._id).to.eql("5fa86fc653275a29f4381d8b");
    pm.expect(res.pathNodes[2]._id).to.eql("5fa86fc653275a29f4381d89");
});

//GET PATH NODES BY ID
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
    if (query["id"] == "5fa86fc653275a29f4381d8d") {
        pm.expect(res.node).to.eql("5fa86fc653275a29f4381d84")
    } else if (query["id"] == "5fa86fc653275a29f4381d8b") {
        pm.expect(res.name).to.eql("5fa86fc653275a29f4381d83")
    } else {
        pm.expect(res).to.eql("not_found")
    }
});