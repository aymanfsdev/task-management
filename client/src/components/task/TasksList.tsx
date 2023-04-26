import React from "react"
import { useQuery } from "react-query"
import axios from 'axios'
import { endpoint } from "../../utils"
import {useQueryClient,useMutation} from 'react-query'
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';

import EditTask from './EditTask'
import BeatLoader from "react-spinners/BeatLoader";
import {motion as m,AnimatePresence} from 'framer-motion'
type Props = {}
type TaskListType={title:string;description:string;createdAt:string,id:string;}
export type EditedTaskType={title:string;description:string;}
export default function TasksList({}: Props) {
    const [open, setOpen] = React.useState<boolean>(false);
    const [id,setId]=React.useState<string>('')
    const [editedTask,setEditedTask]=React.useState<EditedTaskType>({title:'',description:''})
    const { data, isLoading,isError } = useQuery(
        "getTasks",
       async ()=>{
        const response= await axios.get(endpoint)
        return response.data
        }
    )
    const queryClient = useQueryClient()
  
  
    const { mutate } = useMutation(
      async (id:string) => await axios.delete(`${endpoint}/${id}`),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("getTasks")
         
        },
      }
    )
    if(isError) return <h1 style={{textAlign:'center'}}>Error fetching the tasks.</h1>
    if(isLoading) return  <div className="flex">
      <BeatLoader color="#096BDE"/>
    </div>
    const deleteTask=(id:string)=>()=>{
        mutate(id)
    }
    const resetUpdatedTask=()=>{setEditedTask({title:'',description:''})}
  return (
    <AnimatePresence mode="wait">

    <div style={{display:'flex',gap:20,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h1>Tasks</h1>
        {data?.length>0 ? data?.map(({id,title,description,createdAt}:TaskListType,index:number)=>{
          return<m.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0.5}} transition={{duration:0.76,delay:index*.2}} key={id}>  <Card   variant="outlined" sx={{ width: 320 }}>
            <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
             {title}
            </Typography>
            <Typography mb={2} level="body2">{createdAt}</Typography>
            
           
            <Box sx={{ display: 'flex' }}>
              <div>
                <Typography level="body3">{description}</Typography>
                
              </div>
              <Button
                variant="solid"
                size="sm"
                color="primary"
                sx={{ ml: 'auto', fontWeight: 600 }}
                onClick={deleteTask(id)}
                >
               Delete
              </Button>
              <Button
                variant="solid"
                size="sm"
                color="primary"
                
                sx={{ ml: 'auto', fontWeight: 600 }}
                onClick={()=>{
                  setOpen(true)
                  setId(id)
                  setEditedTask({title,description})
                }}
                >
              Edit
              </Button>
            </Box>
          </Card>
          </m.div>
        }):<h1 style={{textAlign:'center'}}>Task List is empty.</h1>}
        <EditTask resetUpdatedTask={resetUpdatedTask} editedTask={editedTask} id={id} open={open} closeModal={()=>setOpen(false)}/>
    </div>
        </AnimatePresence>
  )
}