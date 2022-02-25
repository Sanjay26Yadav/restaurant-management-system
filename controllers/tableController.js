const Table = require('../models/tableModel')



const addtable = async (req, res) => {
    const {tableno, capacity, tableStatus, waiter, order, bill } = req.body;
   
        try {
         
         
 
         //create and store the new table
       
         const result = await Table.create({
            "TableNo": tableno,
             "Capacity": capacity,
             "TableStatus": tableStatus,
             "Waiter": waiter,
             "Order": order,
             "Bill": bill
        });
 
         console.log(result);
 
         res.status(201).json({ 'success': `New table ${tableno} created!` });
     } catch (err) {
         res.status(500).json({ 'message': err.message });
     }
     

    
}

const updatetable = async (req, res) => {
    const {  tableno, capacity, tableStatus, waiter, order, bill } = req.body;
    
        try {
         
         let filter = await Table.findOne({TableNo: tableno });
         let update = {
            "Capacity": capacity,
            "TableStatus": tableStatus,
            "Waiter": waiter,
            "Order": order,
            "Bill": bill
        }

        if(filter){
            const result = await Table.findOneAndUpdate({TableNo: tableno },update);

            console.log(result);
 
            res.status(201).json({ 'success': `Table has been updated!` });
        }else{
            return res.status(400).send('invalid Table No..');
        }
 
         
         
 
        
     } catch (err) {
         res.status(500).json({ 'message': err.message });
     }
    

    
}



const booktable = async (req, res) => {
    const {  tableStatus } = req.body;
    
        try {
         
         let TableStatus = await Table.findOne({TableStatus: "Open" });
        

        if(TableStatus){
            const result = await Table.findOneAndUpdate({TableStatus: "Open" },{"TableStatus": tableStatus});

            console.log(result);
 
            res.status(201).json({ 'success': `Table ${result.TableNo} bookeded!` });
        }else{
            return res.status(400).send('No table available.');
        }
    
     } catch (err) {
         res.status(500).json({ 'message': err.message });
     }
      
}

const assignwaiter = async (req, res) => {
    const {  Tableno, Waiter } = req.body;
   
        try {
         
         let tableno = await Table.findOne({TableNo: Tableno });
         

        if(tableno){
            const result = await Table.findOneAndUpdate({TableNo: Tableno },{ "Waiter": Waiter });

            console.log(result);
 
            res.status(201).json({ 'success': `Table ${result.TableNo} waiter ${result.Waiter} assigned!` });
        }else{
            return res.status(400).send('No table available.');
        }
 
         
        
        
     } catch (err) {
         res.status(500).json({ 'message': err.message });
     }
     

    
}


const placeorder = async (req, res) => {
    const {  tableNo, Oreder } = req.body;
    
        try {
        
         let tableno = await Table.findOne({TableNo: tableNo });

        if(tableno){
            const result = await Table.findOneAndUpdate({TableNo: tableNo },{"Order": Oreder});

            console.log(result);
 
            res.status(201).json({ 'success': `Table ${result.TableNo} placed!` });
        }else{
            return res.status(400).send('No table available.');
        }
 
         
         
 
        
     } catch (err) {
         res.status(500).json({ 'message': err.message });
     }
     
    
}

const seebill = async (req, res) => {
    const {  TableNo } = req.body;
   
        try {
        
         let tableno = await Table.findOne({TableNo: TableNo });

        if(tableno){
            const result =  tableno.bill;

            console.log(result);
 
            res.status(201).json({ 'success': `Table ${tableno.TableNo} bill is ${tableno.Bill} .` });
        }else{
            return res.status(400).send('No table available.');
        }
 
         
         
 
        
     } catch (err) {
         res.status(500).json({ 'message': err.message });
     }
     

    
}


const generatebill = async (req, res) => {
    const { TableNo, bill } = req.body;
   
        try {
        
         let tableno = await Table.findOne({TableNo: TableNo });

        if(tableno){
            const result = await Table.findOneAndUpdate({TableNo: TableNo },{"Bill": bill });
 
            res.status(201).json({ 'success': `Table ${result.TableNo} bill is ${result.Bill} .` });
        }else{
            return res.status(400).send('No table available.');
        }
 
         
         
 
        
     } catch (err) {
         res.status(500).json({ 'message': err.message });
     }
     

    
}


const deletetable = async (req, res) => {
    const {  tableno} = req.body;
    
        try {
        
         let filter = await Table.findOne({TableNo: tableno });
         

        if(filter){
            
             
              // Delete single document
             let result = await Table.deleteOne({TableNo: tableno });

            
 
            res.status(201).json({ 'success': `Table ${filter.TableNo} has been deleted!` });
        }else{
            return res.status(400).send('invalid Table No..');
        }
 
         
         
 
        
     } catch (err) {
         res.status(500).json({ 'message': err.message });
     }
    

    
}




module.exports = {  addtable,
                    updatetable,
                    booktable,
                    assignwaiter,
                    placeorder,
                    seebill,
                    generatebill,
                    deletetable
                    
                 };