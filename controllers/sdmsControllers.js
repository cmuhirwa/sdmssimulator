const fs = require('fs');
module.exports.schools = async (req, res)=>{
    let rawdata = fs.readFileSync('./data/schools.json');
    let jsondata = JSON.parse(rawdata);
    res.json(jsondata)
}

module.exports.addTeacher = async (req, res)=>{
    let teacher = req.body;
    let teachers = JSON.parse(fs.readFileSync('./data/teachers.json'));
    const teacherExists = teachers.find(c => c.staffId === parseInt(teacher.staffId));
    if(!teacherExists){
        res.status(404).send({data: 'You are have already submited your information'});
    } 
    else{
        teachers.push(teacher);
        fs.writeFile('./data/teachers.json', JSON.stringify(teachers, null, 2), err=>{
            if(err){
                console.log(err);
            }else{
                res.status(200).send({data: teacher});
            }
        });
    }
    
}

module.exports.getHierarchy = async (req, res)=>{
    let parent = req.body.parent;;
    let parentCode = req.body.parentCode;
    let hierarchy = JSON.parse(fs.readFileSync('./data/study_hierarchy.json'));
      
    if(parent === 'levels'){
        const levels = [...new Map(hierarchy.map((item) => [item["level_name"], item])).values()];
        res.send(levels);
    }
    else if(parent === 'combinations'){
        let combinations = hierarchy.filter(obj => {
            return obj.level_code === parentCode;
          });
        combinations = [...new Map(combinations.map((item) => [item["combination_name"], item])).values()];
        res.send(combinations)
    } 
    else if(parent === 'grades'){
        let grades = hierarchy.filter(obj => {
            return obj.combination_code === parentCode;
          });
        grades = [...new Map(grades.map((item) => [item["grade_name"], item])).values()];
        res.send(grades)
    }  
    else if(parent === 'courses'){
        let courses = hierarchy.filter(obj => {
            return obj.grade_code === parentCode;
          });
        courses = [...new Map(courses.map((item) => [item["course_name"], item])).values()];
        res.send(courses)
    }  
}