import { ChangeEvent, useState } from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useQueryClient, useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { endpoint } from "../../utils";
import { Grid } from "@mui/joy";
type Props = {};

function AddTask({}: Props) {
  const [state, setState] = useState({
    title: "",
    description: "",
  });

  const queryClient = useQueryClient();

  const { mutate,isLoading } = useMutation(
    async () => await axios.post(endpoint, { ...state }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getTasks");
      },
    }
  );
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const addTask = () => {
    if (!state.title || !state.description) {
      alert("Input should be completed");
      return;
    }
    mutate();
    setState({title:'',description:''})
  };
  
  return (
    <form>
      <Grid container spacing={2} style={{padding: "20px 40px", justifyContent:"center"}}>
        <Grid>
          <Input
            placeholder="Name…"
            name="title"
            value={state.title}
            onChange={onChangeHandler}
          />
        </Grid>
        <Grid>
          <Input
            placeholder="Description…"
            name="description"
            value={state.description}
            onChange={onChangeHandler}
          />
        </Grid>
        <Grid>
          <Button disabled={isLoading} onClick={addTask}>Add</Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddTask;
