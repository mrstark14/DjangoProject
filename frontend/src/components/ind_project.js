import React, {useState, useEffect} from "react";
import axios from 'axios'

function ProjectDetail( match ) {
    const [projects, setProject] = useState([]);
    const [project__members, setProjectMembers] = useState([]);

    useEffect(() => {
        fetchProject();
    },[]);

    const fetchProject = async () => {
        axios.get(`http://127.0.0.1:8000/api/project/${match.match.params.id}`).then(
            (res) => {
                setProject(res.data)
                setProjectMembers(res.data.project_members)
            }
        ).catch(err => {
            console.log("Error")
        })
    };
    console.log(match.match.params.id)
    //console.log(JSON.stringify(projects.project_members))

    return (
        <div>
            {projects.project_name}, project leader: {projects.project_leader} Project Members : <ul>
            {project__members.map(member => {
                return (
                    <>
                        <li>{member}</li>
                    </>
                )
            })}
            </ul>
        </div>
    );
}

export default ProjectDetail;