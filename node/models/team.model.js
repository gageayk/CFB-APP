const mongoose = require('mongoose');


const reqString = {
    type: String,
    required: true,
}

const teamSchema = new mongoose.Schema({
    _id: reqString,
    totalOff: reqString,
    rushingOff: reqString,
    passingOff: reqString,
    teamPassingEff: reqString,
    scoringOff: reqString,
    totalDef: reqString,
    rusingDef: reqString,
    passingYdsAll: reqString,
    teamPassingEffDef: reqString,
    scoringDef: reqString,
    turnMarg: reqString,
    thirdConPct: reqString,
    fourthConPct: reqString,
    thirdConPctDef: reqString,
    fourthConPctDef: reqString,
    redZoneOff: reqString,
    redZoneDef: reqString,
    netPunt: reqString,
    puntRet: reqString,
    kickoffRet: reqString,
    firstDOff: reqString,
    firstDDef: reqString,
    fewPenPG: reqString,
    fewPenYdsPG: reqString,
    timePos: reqString,
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
})

const Team = mongoose.model('Team', teamSchema)

module.exports = { Team }