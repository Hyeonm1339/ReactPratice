import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import {useState} from "react";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {

    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: []
    })

    function handleAddTask(text) {
        setProjectsState((prevState) => {
            const taskId = Math.random()
            const newTask = {
                text: text,
                projectId: projectsState.selectedProjectId,
                id: taskId
            }
            return {
                ...prevState,
                tasks: [...prevState.tasks, newTask]
            }
        })
    }

    function handleDeleteTask(id) {

        setProjectsState((prevState) => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter((tasks) => tasks.id !== id)
            };
        })
    }


    function handleSelectProject(id) {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: id,
            };
        });
    }

    function handleStartAddProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: null,
            };
        });
    }

    function handleAddProject(projectData) {
        setProjectsState((prevState) => {
            const projectid = Math.random()
            const newProject = {
                ...projectData,
                id: projectid
            }
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: [...prevState.projects, newProject]
            }
        })
    }

    function handleCancelAddProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
            };
        })
    }

    function handleDeleteProject() {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: [...prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)]
            };
        })
    }

    const selectedProject = projectsState.projects.find((project) => {
        return project.id === projectsState.selectedProjectId
    });

    let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask}
                                   onDeleteTask={handleDeleteTask}
                                   tasks={projectsState.tasks}/>;

    if (projectsState.selectedProjectId === null) {
        content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
    } else if (projectsState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectsSidebar
                onStartAddProject={handleStartAddProject}
                projects={projectsState.projects}
                onSelectProject={handleSelectProject}
            selectedProjectId={projectsState.selectedProjectId}/>
            {content}
        </main>
    );
}

export default App;
