//GET NODES DTO
if (environment.env === "TESTING") {
    const res = pm.response.json();

    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });

    pm.test("Status code name has 'OK'", function () {
        pm.response.to.have.status("OK");
    });

    pm.test("There should be 3 nodes", function () {
        pm.expect(res.nodes.length).to.eql(3);
    });

    pm.test("Node _name match expected", function () {
        pm.expect(res.nodes[0].name).to.eql("TestNode1");
        pm.expect(res.nodes[1].name).to.eql("TestNode2");
        pm.expect(res.nodes[2].name).to.eql("TestNode3");
    });
};

//GET NODES COMPLETE
if (environment.env === "TESTING") {
    const res = pm.response.json();

    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });

    pm.test("Status code name has 'OK'", function () {
        pm.response.to.have.status("OK");
    });

    pm.test("There should be 3 nodes", function () {
        pm.expect(res.nodes.length).to.eql(3);
    });

    pm.test("Node _name match expected", function () {
        pm.expect(res.nodes[0].name).to.eql("TestNode1");
        pm.expect(res.nodes[1].name).to.eql("TestNode2");
        pm.expect(res.nodes[2].name).to.eql("TestNode3");
    });

    pm.test("Got all Id's", function () {
        pm.expect(res.nodes[0]._id).to.eql("id1");
        pm.expect(res.nodes[1]._id).to.eql("id2");
        pm.expect(res.nodes[2]._id).to.eql("id3");
    });
};

//GET NODES BY ID
if (environment.env === "TESTING") {

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
        if (query["id"] == 5) {
            pm.expect(res.name).to.eql("Mock Node")
        } else if (query["id"] == 10) {
            pm.expect(res.name).to.eql("Mock Node 2")
        } else {
            pm.expect(res).to.eql("not_found")
        }
    })
}
