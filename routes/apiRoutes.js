

const tableData = require("../data/tableData");
const waitListData = require("../data/waitinglistData");




module.exports = function(app) {


  app.get("/api/getNotes", function(req, res) {
    res.json(tableData);
  });

  app.get("/api/Addnotes", function(req, res) {
    res.json(waitListData);
  });

  

  app.post("/api/removeNotes", function(req, res) {
    
    if (tableData.length < 5) {
      tableData.push(req.body);
      res.json(true);
    }
    else {
      waitListData.push(req.body);
      res.json(false);
    }
  });

 

  app.post("/api/clear", function(req, res) {
   
    tableData.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });
};
