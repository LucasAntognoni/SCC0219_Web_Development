let db;

$(document).ready(function(){
    var request=indexedDB.open('Pets',1);

    request.onsuccess=function(e){
        console.log("Success creating database!");
        db=e.target.result;
    }

    request.onerror=function(){
        console.log("Messed up on creating database!");
    
    }


    request.onupgradeneeded=function(e){
       db=e.target.result;
       if(!db.objectStore.names.contains("Animals")){
            var os=db.createObjectStore("Animals",{keyPath: "ID", autoIncrement: true});
            os.createIndex('petname','petname',{unique:false});
            os.createIndex('pedigree', 'pedigree',{unique:false});
            os.createIndex('age','age',{unique:false});
            os.createIndex('image','image',{unique:false});
       }   
    }

});


function addPet(){
    var petname= $('#petname').val();
    var raca= $('#raca').val();
    var idade= $('#idade').val();
    var image= $('#image').val();
    
    var Pet={
        petname: petname,
        pedigree: raca,
        age: idade,
        image: image
    };
   var transaction=db.transaction(["Animals"],"readwrite");
   transaction.oncomplete=function(e){
       console.log("Transaction stablished. Adding Pet");
   };
   transaction.onerror=function(e){
       console.log("Transaction messed up. Please refresh your system");
   };
    
    var os=transaction.objectStore("Animals");

    var request=os.add(Pet);
    
    request.onsuccess=function(e){
        console.log("Pet added, congrats!");
    };
    
    request.onerror=function(e){
        console.log("I'm sorry Dave, I'm afraid I cannot do that");
    };
}
