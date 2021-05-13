const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const mongo = require('./mongoose');
const { Mongoose } = require('mongoose');
const teamSchema = require('./models/team.model')
// const url = 'http://stats.ncaa.org/teams/499512';

function updateTeamStats(name, url){
    puppeteer
    .launch()
    .then(function(browser) {
      return browser.newPage();
    })
    .then(function(page) {
      return page.goto(url).then(function() {
        return page.content();
      });
    })
    .then(async function(html) {
      // var table = [name]
      var object = {
        _id: name,
        totalOff: '',
        rushingOff: '',
        passingOff: '',
        teamPassingEff: '',
        scoringOff: '',
        totalDef: '',
        rusingDef: '',
        passingYdsAll: '',
        teamPassingEffDef: '',
        scoringDef: '',
        turnMarg: '',
        thirdConPct: '',
        fourthConPct: '',
        thirdConPctDef: '',
        fourthConPctDef: '',
        redZoneOff: '',
        redZoneDef: '',
        netPunt: '',
        puntRet: '',
        kickoffRet: '',
        firstDOff: '',
        firstDDef: '',
        fewPenPG: '',
        fewPenYdsPG: '',
        timePos: ''
        // apy: {
        //   player: '',
        //   value: ''
        // },
        // fgm: {
        //   player: '',
        //   value: ''
        // },
        // intc: {
        //   player: '',
        //   value: ''
        // },
        // passEff: {
        //   player: '',
        //   value: ''
        // },
        // points: {
        //   player: '',
        //   value: ''
        // },
        // puntAvg: {
        //   player: '',
        //   value: ''
        // },
        // puntRetYds: {
        //   player: '',
        //   value: ''
        // },
        // rec: {
        //   player: '',
        //   value: ''
        // },
        // recYds: {
        //   player: '',
        //   value: ''
        // },
        // rushNetYds: {
        //   player: '',
        //   value: ''
        // },
        // sacks: {
        //   player: '',
        //   value: ''
        // },
        // tackles: {
        //   player: '',
        //   value: ''
        // },
        // totalOff: {
        //   player: '',
        //   value: ''
        // }
      }
      var ftLine = []
      var count = 0;
      var three = 1;
      const $ = cheerio.load('mytable tr')
      $('.mytable tr', html).each(function() {
          var line = $(this).text().split('\n')
          for(var i = 0; i < line.length; i++){
            if(line[i].trim().length != 0 && !line[i].trim().includes('Team Stats') && !line[i].trim().includes('Individual') && (line[i].trim() != 'Stat' && line[i].trim() != 'Rank' && line[i].trim() != 'Player' && line[i].trim() != 'Value' && line[i].trim() != 'View Complete Ranking Summary')){
              if(three == 3 && count < 25){
                ftLine.push(line[i].trim())
                three = 1
                count++;
              }else{
                three ++;
              }
            }
          }
          // for(var i = 0; i < ftLine.length; i++){
          //   console.log(ftLine[i].length)
          // }
          
        
          // list way
          // for(var i = 0; i < line.length; i++){
          //     if(!line[i].trim().includes('Team Stats') && !line[i].trim().includes('Individual')){
          //         if(line[i].trim().length > 0 && (line[i].trim() != 'Stat' && line[i].trim() != 'Rank' && line[i].trim() != 'Player' && line[i].trim() != 'Value' && line[i].trim() != 'View Complete Ranking Summary')){
          //             table.push(line[i].trim())
          //         }
          //     }
          //     if(line[i].trim().length > 5 && i < 49){
          //         i++;
          //     }
          // }
      })
      for(var i = 0; i < ftLine.length; i++){
        if(i == 0){
          object.totalOff = ftLine[i];
        }else if(i == 1){
          object.rushingOff = ftLine[i];
        }else if(i == 2){
          object.passingOff = ftLine[i];
        }else if(i == 3){
          object.teamPassingEff = ftLine[i];
        }else if(i == 4){
          object.scoringOff = ftLine[i];
        }else if(i == 5){
          object.totalDef = ftLine[i];
        }else if(i == 6){
          object.rusingDef = ftLine[i];
        }else if(i == 7){
          object.passingYdsAll = ftLine[i];
        }else if(i == 8){
          object.teamPassingEffDef = ftLine[i];
        }else if(i == 9){
          object.scoringDef = ftLine[i];
        }else if(i == 10){
          object.turnMarg = ftLine[i];
        }else if(i == 11){
          object.thirdConPct = ftLine[i];
        }else if(i == 12){
          object.fourthConPct = ftLine[i];
        }else if(i == 13){
          object.thirdConPctDef = ftLine[i];
        }else if(i == 14){
          object.fourthConPctDef = ftLine[i];
        }else if(i == 15){
          object.redZoneOff = ftLine[i];
        }else if(i == 16){
          object.redZoneDef = ftLine[i];
        }else if(i == 17){
          object.netPunt = ftLine[i];
        }else if(i == 18){
          object.puntRet = ftLine[i];
        }else if(i == 19){
          object.kickoffRet = ftLine[i];
        }else if(i == 20){
          object.firstDOff = ftLine[i];
        }else if(i == 21){
          object.firstDDef = ftLine[i];
        }else if(i == 22){
          object.fewPenPG = ftLine[i];
        }else if(i == 23){
          object.fewPenYdsPG = ftLine[i];
        }else{
          object.timePos = ftLine[i];
        }
      }

      await mongo().then( async mongoose => {
        try{
          await new teamSchema(object).save();
        } catch(error){
          console.log(error)
        } 
        finally{
          mongoose.connection.close();
        }
      })


      // console.log(object)
      console.log(`${name} stats updated`)
      return object;
    })
    .catch(function(err) {
      //handle error
      console.log(err);
    });
}

//done
async function updateSEC(){

  // var SEC = {
  //   Alabama: {},
  //   // Ole_Miss: updateTeamStats('Ole Miss', 'http://stats.ncaa.org/teams/499572'),
  //   // Texas_AM: updateTeamStats('Texas A&M', 'http://stats.ncaa.org/teams/499613'),
  //   // Florida: updateTeamStats('Florida', 'http://stats.ncaa.org/teams/499543'),
  //   // LSU: updateTeamStats('LSU', 'http://stats.ncaa.org/teams/499558'),
  //   // Gerogia: updateTeamStats('Georgia', 'http://stats.ncaa.org/teams/499547'),
  //   // Missouri: updateTeamStats('Missouri', 'http://stats.ncaa.org/teams/499573'),
  //   // Arkansas: updateTeamStats('Arkansas', 'http://stats.ncaa.org/teams/499517'),
  //   // Auburn: updateTeamStats('Auburn', 'http://stats.ncaa.org/teams/499518'),
  //   // South_Carolina: updateTeamStats('South Carolina', 'http://stats.ncaa.org/teams/499602'),
  //   // Tennesse: updateTeamStats('Tennesse', 'http://stats.ncaa.org/teams/499612'),
  //   // Miss_St: updateTeamStats('Miss. St.', 'http://stats.ncaa.org/teams/499571'),
  //   // Kentucky: updateTeamStats('Kentucky', 'http://stats.ncaa.org/teams/499557'),
  //   // Vanderbilt: updateTeamStats('Vanderbilt', 'http://stats.ncaa.org/teams/499628')
  // }

  // var test = new Promise(function (resolve, reject) {
  //   resolve(updateTeamStats('Alabama', 'http://stats.ncaa.org/teams/499512'))
  // })

  // console.log(test)
  updateTeamStats('Alabama', 'http://stats.ncaa.org/teams/499512')
  updateTeamStats('Ole Miss', 'http://stats.ncaa.org/teams/499572')
  updateTeamStats('Texas A&M', 'http://stats.ncaa.org/teams/499613')
  updateTeamStats('Florida', 'http://stats.ncaa.org/teams/499543')
  updateTeamStats('LSU', 'http://stats.ncaa.org/teams/499558')
  updateTeamStats('Georgia', 'http://stats.ncaa.org/teams/499547')
  updateTeamStats('Missouri', 'http://stats.ncaa.org/teams/499573')
  updateTeamStats('Arkansas', 'http://stats.ncaa.org/teams/499517')
  updateTeamStats('Auburn', 'http://stats.ncaa.org/teams/499518')
  updateTeamStats('South Carolina', 'http://stats.ncaa.org/teams/499602')
  updateTeamStats('Tennesse', 'http://stats.ncaa.org/teams/499612')
  updateTeamStats('Miss. St.', 'http://stats.ncaa.org/teams/499571')
  updateTeamStats('Kentucky', 'http://stats.ncaa.org/teams/499557')
  updateTeamStats('Vanderbilt', 'http://stats.ncaa.org/teams/499628')
}

//done
function updateBig12(){
    updateTeamStats('Oklahoma','http://stats.ncaa.org/teams/499590')
    updateTeamStats('Texas','http://stats.ncaa.org/teams/499616')
    updateTeamStats('Iowa St.','http://stats.ncaa.org/teams/499552')
    updateTeamStats('Texas Tech','http://stats.ncaa.org/teams/499615')
    updateTeamStats('Oklahoma St.','http://stats.ncaa.org/teams/499589')
    updateTeamStats('West Virginia','http://stats.ncaa.org/teams/499634')
    updateTeamStats('TCU','http://stats.ncaa.org/teams/499614')
    updateTeamStats('Kansas St.','http://stats.ncaa.org/teams/499554')
    updateTeamStats('Baylor','http://stats.ncaa.org/teams/499520')
    updateTeamStats('Kansas','http://stats.ncaa.org/teams/499555')
}

//done
function updateACC(){
  updateTeamStats('North Carolina','http://stats.ncaa.org/teams/499574')
  updateTeamStats('Clemson','http://stats.ncaa.org/teams/499532')
  updateTeamStats('Wake Forest','http://stats.ncaa.org/teams/499631')
  updateTeamStats('Louisville','http://stats.ncaa.org/teams/499560')
  updateTeamStats('Virginia Tech','http://stats.ncaa.org/teams/499629')
  updateTeamStats('Miami (FL)','http://stats.ncaa.org/teams/499566')
  updateTeamStats('Virginia','http://stats.ncaa.org/teams/499630')
  updateTeamStats('Florida St.','http://stats.ncaa.org/teams/499542')
  updateTeamStats('Gerogia Tech','http://stats.ncaa.org/teams/499546')
  updateTeamStats('Boston College','http://stats.ncaa.org/teams/499522')
  updateTeamStats('NC State','http://stats.ncaa.org/teams/499581')
  updateTeamStats('Pittsburgh','http://stats.ncaa.org/teams/499595')
  updateTeamStats('Duke','http://stats.ncaa.org/teams/499537')
  updateTeamStats('Syracuse','http://stats.ncaa.org/teams/499610')
}

//done
function updateBigTen(){
  updateTeamStats('Ohio St.','http://stats.ncaa.org/teams/499587')
  updateTeamStats('Penn St.','http://stats.ncaa.org/teams/499594')
  updateTeamStats('Maryland','http://stats.ncaa.org/teams/499562')
  updateTeamStats('Nebraska','http://stats.ncaa.org/teams/499576')
  updateTeamStats('Minnesota','http://stats.ncaa.org/teams/499570')
  updateTeamStats('Purdue','http://stats.ncaa.org/teams/499596')
  updateTeamStats('Michigan','http://stats.ncaa.org/teams/499568')
  updateTeamStats('Iowa','http://stats.ncaa.org/teams/499553')
  updateTeamStats('Northwestern','http://stats.ncaa.org/teams/499585')
  updateTeamStats('Indiana','http://stats.ncaa.org/teams/499551')
  updateTeamStats('Illinois','http://stats.ncaa.org/teams/499550')
  updateTeamStats('Wisconsin','http://stats.ncaa.org/teams/499637')
  updateTeamStats('Rutgers','http://stats.ncaa.org/teams/499598')
  updateTeamStats('Michigan St.','http://stats.ncaa.org/teams/499567')
}

//done
function updatePac12(){
  updateTeamStats('Arizona St.','http://stats.ncaa.org/teams/499514')
  updateTeamStats('UCLA','http://stats.ncaa.org/teams/499528')
  updateTeamStats('Stanford','http://stats.ncaa.org/teams/499609')
  updateTeamStats('Southern California','http://stats.ncaa.org/teams/499604')
  updateTeamStats('Colorado','http://stats.ncaa.org/teams/499535')
  updateTeamStats('Oregon','http://stats.ncaa.org/teams/499593')
  updateTeamStats('Utah','http://stats.ncaa.org/teams/499627')
  updateTeamStats('Oregon St.','http://stats.ncaa.org/teams/499592')
  updateTeamStats('Washington','http://stats.ncaa.org/teams/499633')
  updateTeamStats('Washington St.','http://stats.ncaa.org/teams/499632')
  updateTeamStats('Arizona','http://stats.ncaa.org/teams/499515')
  updateTeamStats('California','http://stats.ncaa.org/teams/499527')
}

//done
function updateAAC(){
  updateTeamStats('UCF','http://stats.ncaa.org/teams/499529')
  updateTeamStats('SMU','http://stats.ncaa.org/teams/499605')
  updateTeamStats('Memphis','http://stats.ncaa.org/teams/499564')
  updateTeamStats('Cincinnati','http://stats.ncaa.org/teams/499531')
  updateTeamStats('Tulsa','http://stats.ncaa.org/teams/499622')
  updateTeamStats('Houston','http://stats.ncaa.org/teams/499549')
  updateTeamStats('East Carolina','http://stats.ncaa.org/teams/499538')
  updateTeamStats('Tulane','http://stats.ncaa.org/teams/499621')
  updateTeamStats('South Fla.','http://stats.ncaa.org/teams/499603')
  updateTeamStats('Temple','http://stats.ncaa.org/teams/499611')
  updateTeamStats('Navy','http://stats.ncaa.org/teams/499625')
}

//done
function udpateCUSA(){
  updateTeamStats('North Texas','http://stats.ncaa.org/teams/499582')
  updateTeamStats('UTSA','http://stats.ncaa.org/teams/499618')
  updateTeamStats('UAB','http://stats.ncaa.org/teams/499510')
  updateTeamStats('Marshall','http://stats.ncaa.org/teams/499561')
  updateTeamStats('Charlotte','http://stats.ncaa.org/teams/499575')
  updateTeamStats('Southern Miss.','http://stats.ncaa.org/teams/499606')
  updateTeamStats('Middle Tenn.','http://stats.ncaa.org/teams/499569')
  updateTeamStats('UTEP','http://stats.ncaa.org/teams/499617')
  updateTeamStats('Rice','http://stats.ncaa.org/teams/499597')
  updateTeamStats('Fla. Atlantic','http://stats.ncaa.org/teams/499540')
  updateTeamStats('Louisiana Tech','http://stats.ncaa.org/teams/499559')
  updateTeamStats('Western Ky.','http://stats.ncaa.org/teams/499635')
  updateTeamStats('FIU','http://stats.ncaa.org/teams/499541')
}

//done
function updateIND(){
  updateTeamStats('BYU','http://stats.ncaa.org/teams/499524')
  updateTeamStats('Liberty','http://stats.ncaa.org/teams/499639')
  updateTeamStats('Notre Dame','http://stats.ncaa.org/teams/499586')
  updateTeamStats('Army','http://stats.ncaa.org/teams/499624')
  updateTeamStats('Massachusetts','http://stats.ncaa.org/teams/499563')
}

//done
function updateMAC(){
  updateTeamStats('Kent St.','http://stats.ncaa.org/teams/499556')
  updateTeamStats('Buffalo','http://stats.ncaa.org/teams/499525')
  updateTeamStats('Toledo','http://stats.ncaa.org/teams/499619')
  updateTeamStats('Western Mich.','http://stats.ncaa.org/teams/499636')
  updateTeamStats('Ball St.','http://stats.ncaa.org/teams/499519')
  updateTeamStats('Central Mich.','http://stats.ncaa.org/teams/499530')
  updateTeamStats('Eastern Mich.','http://stats.ncaa.org/teams/499539')
  updateTeamStats('Northern ILL.','http://stats.ncaa.org/teams/499584')
  updateTeamStats('Miami (OH)','http://stats.ncaa.org/teams/499565')
  updateTeamStats('Ohio','http://stats.ncaa.org/teams/499588')
  updateTeamStats('Bowling Green','http://stats.ncaa.org/teams/499523')
  updateTeamStats('Akron','http://stats.ncaa.org/teams/499511')
}

//done
function updateMWC(){
  updateTeamStats('Fresno St.','http://stats.ncaa.org/teams/499526')
  updateTeamStats('Nevada','http://stats.ncaa.org/teams/499578')
  updateTeamStats('San Jose St.','http://stats.ncaa.org/teams/499600')
  updateTeamStats('New Mexico','http://stats.ncaa.org/teams/499580')
  updateTeamStats('Air Force','http://stats.ncaa.org/teams/499623')
  updateTeamStats('Hawaii','http://stats.ncaa.org/teams/499548')
  updateTeamStats('Wyoming','http://stats.ncaa.org/teams/499638')
  updateTeamStats('San Diego St.','http://stats.ncaa.org/teams/499599')
  updateTeamStats('Boise St.','http://stats.ncaa.org/teams/499521')
  updateTeamStats('UNLV','http://stats.ncaa.org/teams/499577')
  updateTeamStats('Colorado St.','http://stats.ncaa.org/teams/499534')
  updateTeamStats('Utah St.','http://stats.ncaa.org/teams/499626')
}

//done
function updateSBC(){
  updateTeamStats('Arkansas St.','http://stats.ncaa.org/teams/499516')
  updateTeamStats('App State','http://stats.ncaa.org/teams/499513')
  updateTeamStats('Costal Carolina','http://stats.ncaa.org/teams/499533')
  updateTeamStats('Gerogia St.','http://stats.ncaa.org/teams/499545')
  updateTeamStats('Louisiana','http://stats.ncaa.org/teams/499608')
  updateTeamStats('Troy','http://stats.ncaa.org/teams/499620')
  updateTeamStats('Ga. Southern','http://stats.ncaa.org/teams/499544')
  updateTeamStats('Texas St.','http://stats.ncaa.org/teams/499607')
  updateTeamStats('South Alabama','http://stats.ncaa.org/teams/499601')
  updateTeamStats('ULM','http://stats.ncaa.org/teams/499583')
}




function updatePower5(){
  updateSEC();
  updateBig12();
  updateACC();
  updateBigTen();
  updatePac12();
}

function updateGroup(){
  updateAAC();
  udpateCUSA();
  updateSBC();
  updateIND();
}

function updateMs(){
  updateMAC();
  updateMWC();
}

updateSEC();
// updateBig12();
// updateACC();
// updateBigTen();
// updatePac12();
// updateAAC();
// udpateCUSA();
// updateSBC();
// updateIND();
// updateMAC();
// updateMWC();

// updatePower5();
// updateSEC();
// updateGroup();
// updateMs();
// updateTeamStats('Texas A&M','http://stats.ncaa.org/teams/499613')
// updateTeamStats('Charlotte','http://stats.ncaa.org/teams/499575')

async function test() {
  await mongo().then((mongoose) => {
    try{
      console.log('connected')
    } finally{
      mongoose.connection.close();
    }
  })
  
}






