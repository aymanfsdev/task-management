import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import { endpoint } from '../../utils';
import Sheet from '@mui/joy/Sheet';
import {ChangeEvent, useState} from 'react'
import Input from '@mui/joy/Input';
import {useQueryClient,useMutation} from 'react-query'
import axios from 'axios'
import { EditedTaskType } from './TasksList';
export default function BasicModal({open,closeModal,id,editedTask,resetUpdatedTask}:{open:boolean,closeModal:()=>void,id:string;editedTask:EditedTaskType;resetUpdatedTask:()=>void}) {
    const [state,setState]=useState({
        title:'',
        description:''
    })
 
    
    const queryClient = useQueryClient()
  
  
    const { mutate,isLoading } = useMutation(
      async (id:string) => await axios.patch(`${endpoint}/${id}`, { title:state.title?state.title:editedTask.title,description:state.description?state.description:editedTask.description }),
      {
        onSuccess: () => {
          queryClient.invalidateQueries("getTasks")
         
        },
      }
    )
    const onChangeHandler=(event:ChangeEvent<HTMLInputElement>)=>{
        setState({...state,[event.target.name]:event.target.value})
    }
    const addTask=(id:string)=> () =>{
     
        mutate(id)
        
        setState({title:'',description:''})
        resetUpdatedTask()
        closeModal()
    } 
  
  return (
    <React.Fragment>
      
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => closeModal()}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
            }}
          />
           <form >
        <Input className='add-margin' placeholder="Name…" name='title' value={state.title?state.title:editedTask.title} onChange={onChangeHandler}/>
        <Input className='add-margin' placeholder="Description…" name='description' value={state.description?state.description:editedTask.description} onChange={onChangeHandler} />
        <Button className='add-margin' disabled={isLoading} onClick={addTask(id)}>Update</Button>
   </form>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}