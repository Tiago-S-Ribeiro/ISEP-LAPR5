//GET DRIVER TYPES DTO
if (environment.env === "TESTING") {

    const res = pm.response.json();

    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });

    pm.test("Status code name has 'OK'", function () {
        pm.response.to.have.status("OK");
    });

    pm.test("There should be 4 driver types", function () {
        pm.expect(res.driverTypes.length).to.eql(4);
    });

    pm.test("Driver type names match expected", function () {
        pm.expect(res.driverTypes[0].name).to.eql("Tiago Ribeiro");
        pm.expect(res.driverTypes[1].name).to.eql("Rafael Moreira");
        pm.expect(res.driverTypes[2].name).to.eql("Luis Carmo");
        pm.expect(res.driverTypes[3].name).to.eql("Bernardo Carvalho");
    });
};

//GET DRIVER TYPES COMPLETE
if (environment.env === "TESTING") {
    const res = pm.response.json();

    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });

    pm.test("Status code name has 'OK'", function () {
        pm.response.to.have.status("OK");
    });

    pm.test("There should be 4 driver types", function () {
        pm.expect(res.driverTypes.length).to.eql(4);
    });

    pm.test("Driver Type names match expected", function () {
        pm.expect(res.driverTypes[0].name).to.eql("Tiago Ribeiro");
        pm.expect(res.driverTypes[1].name).to.eql("Rafael Moreira");
        pm.expect(res.driverTypes[2].name).to.eql("Luis Carmo");
        pm.expect(res.driverTypes[3].name).to.eql("Bernardo Carvalho");
    });

    pm.test("Got all Id's for all the driver types", function () {
        pm.expect(res.driverTypes[0]._id).to.eql("id_tiago");
        pm.expect(res.driverTypes[1]._id).to.eql("id_rafael");
        pm.expect(res.driverTypes[2]._id).to.eql("id_luis");
        pm.expect(res.driverTypes[3]._id).to.eql("id_bernardo");
    });
};


//GET DRIVER TYPE BY ID
if (environment.env === "TESTING") {

    var query = {};
    pm.request.url.query.all().forEach((param) => { query[param.key] = param.value });

    var res = null;

    if (query["driverType_id"] = "not_found") {
        res = query["driverType_id"];
    } else {
        res = pm.response.json();
    }

    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });

    pm.test("Status code name has 'OK'", function () {
        pm.response.to.have.status("OK");
    });

    pm.test("Has correct ID by checking the name", function () {
        var id = query["driverType_id"];
        if (id == 1) {
            pm.expect(res.name).to.eql("Tiago Ribeiro")
        } else if (id == 2) {
            pm.expect(res.name).to.eql("Rafael Moreira")
        }
        else if (id == 3) {
            pm.expect(res.name).to.eql("Luis Carmo")
        }
        else if (id == 4) {
            pm.expect(res.name).to.eql("Bernardo Carvalho")
        }
        else {
            pm.expect(res).to.eql("not_found")
        };
    });
}