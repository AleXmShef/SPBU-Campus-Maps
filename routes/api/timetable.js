const express = require('express');
const router = express.Router();
const axios = require('axios');
const parser = require('html-to-json-data');
const { group, text, number, href, src, uniq, attr } = require('html-to-json-data/definitions');

// @route   GET api/timetable/weekly
// @desc    Get current user's weekly timetable
// @access  Public
router.get('/weekly', async (req, res) => {
    if(!req.query.arg) {
        return res.status(400).json({message: "No study group specified"});
    }
    try {
        console.log(req.query.arg);
        const temp = await axios.get(req.query.arg,
            {headers: {
                    Cookie: '_culture=ru-ru'}
            });
        const data = await parser(temp.data, {
            timetable: group('#accordion', {
                days: group('.panel.panel-default', {
                    day: text('div div h4'),
                    lessons: group('.common-list-item.row',{
                        datetime: text('.col-sm-2.studyevent-datetime div div span'),
                        subject: text('.col-sm-4.studyevent-subject div div span'),
                        locations: text('.col-sm-3.studyevent-locations div div span'),
                        educators: text('.col-sm-3.studyevent-educators div div span span a')
                    })
                })
            })
        });
        if(!data) {
            res.status(500).json({error: "Cannot fetch any data"});
        }
        res.json(data);
    } catch(err) {
        //console.log(err);
        res.status(500).send('Server error');
    }
});

// @route   GET api/timetable/global
// @desc    Get all global directions
// @access  Public
router.get('/global', async (req, res) => {
    try {
        const temp = await axios.get('https://timetable.spbu.ru/',
            {headers: {
                    Cookie: '_culture=ru-ru'}
            });
        const data = await parser(temp.data, {
            global: group('div:contains("Направления"):first-child li', {
                name: text('a'),
                link: href('a', 'https://timetable.spbu.ru')
            })
        });
        if(!data) {
            res.status(500).json({error: "Cannot fetch any data"});
        }
        res.json(data);
    } catch (err) {
        console.log(err.message);
        console.log(err.request._header);
    }
});

// @route   GET api/timetable/education
// @desc    Get education levels for given direction
// @access  Public
router.get('/education', async (req, res) => {
    if(!req.query.arg) {
        console.log(req.query);
        return res.status(400).json({message: "No global direction specified"});
    }
    try {
        const temp = await axios.get(req.query.arg,
            {headers: {
                    Cookie: '_culture=ru-ru'}
            });
        const data = await parser(temp.data, {
            education: group('#accordion .panel.panel-default', {
                name: text('h4 a'),
                link: href('h4 a', req.query.arg)
            })
        });
        if(!data) {
            res.status(500).json({error: "Cannot fetch any data"});
        }
        res.json(data);
    } catch (err) {
        console.log(err.message);
        console.log(err.request._header);
        res.status(500).send('Server error');
    }

});

// @route   GET api/timetable/program
// @desc    Get study program
// @access  Public
router.get('/program', async (req, res) => {
    if(!req.query.arg) {
        res.status(400).json({message: "No education level specified"});
    }
    try {
        const exp = /#\w*/;
        const level = exp.exec(req.query.arg)[0];
        const temp = await axios.get(req.query.arg,
            {headers: {
                    Cookie: '_culture=ru-ru'}
            });
        const data = await parser(temp.data, {
            program: group(`${level} li`, {
                name: text('.col-sm-5'),
                link: req.query.arg
            })
        });
        if(!data) {
            res.status(500).json({error: "Cannot fetch any data"});
        }
        let imprdata = {program: Array()};
        data.program.forEach(element => {
           if(element.name !== "Образовательная программа") {
               imprdata.program.push(element);
           }
        });
        res.json(imprdata);
    } catch (err) {
        console.log(err.message);
        console.log(err.request._header);
        res.status(500).send('Server error');
    }
});

// @route   GET api/timetable/year
// @desc    Get study program's years
// @access  Public
router.get('/year', async (req, res) => {
    if(!req.query.name || !req.query.link) {
        return res.status(400).json({message: "No education program specified"});
    }
    try {
        const exp = /#\w*/;
        const level = exp.exec(req.query.link)[0];
        const temp = await axios.get(req.query.link,
            {headers: {
                    Cookie: '_culture=ru-ru'}
            });
        const data = await parser(temp.data, {
            study: group(`${level} li`, {
                name: text('.col-sm-5'),
                year: group('.col-sm-1', {
                    name: text('a'),
                    link: href('a', 'https://timetable.spbu.ru')
                })
            })
        });
        if(!data) {
            res.status(500).json({error: "Cannot fetch any data"});
        }
        let cordata = {year: {}};
        data.study.forEach(element => {
            if(element.name === req.query.name)
                cordata.year = element.year;
        });
        res.json(cordata);
    } catch (err) {
        console.log(err.message);
        console.log(err.request._header);
        res.status(500).send('Server error');
    }
});

// @route   GET api/timetable/group
// @desc    Get study program's groups
// @access  Public
router.get('/group', async (req, res) => {
    if(!req.query.arg) {
        res.status(400).json({message: "No education year specified"});
    }
    try {
        const temp = await axios.get(req.query.arg,
            {headers: {
                    Cookie: '_culture=ru-ru'}
            });
        const data = await parser(temp.data, {
            group: group('#studentGroupsForCurrentYear .common-list-item.row', {
                name: text('.col-sm-4'),
                link: attr('.tile', 'onclick')//.replace('window.location.href=\'', 'timetable.spbu.ru')
            })
        });
        if(!data) {
            res.status(500).json({error: "Cannot fetch any data"});
        }
        data.group.forEach(element => {
           element.link = element.link.replace('window.location.href=\'', 'https://timetable.spbu.ru').replace('\'', '');
        });
        res.json(data);
    } catch (err) {
        console.log(err.message);
        console.log(err.request._header);
        res.status(500).send('Server error');
    }
});

module.exports = router;