const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}

const AverageSchema = new mongoose.Schema({
    section: reqString,
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
    timePos: reqString
})

const Average = mongoose.model('Average', AverageSchema)
module.exports = { Average }