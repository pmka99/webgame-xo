import {styled} from '@mui/material/styles' ;
import {Select,Container,TextField} from '@mui/material';


const SelectTag=styled(Select)(({theme})=>({
    margin:'3px',
    backgroundColor:'white',
    width:'100%',
    [theme.breakpoints.down('sm')]:{
        
    }
}))
const ContaitnerTag=styled(Container)(({theme})=>({
    // backgroundColor:'blue',
    
    fontFamily:'cursive',
    [theme.breakpoints.up('sm')]:{
        width:'500px',
        marginTop:'13%',
    },
    [theme.breakpoints.between('xs','sm')]:{
        width:'300px',
        marginTop:'30%',
    },
    [theme.breakpoints.down('xs')]:{
        width:'100%',
        marginTop:'30%',
    },
}))
const TextFieldTag=styled(TextField)(({theme})=>({
    margin:'3px',
    backgroundColor:'white',
    borderRadius:'4px',
    width:'100%',
    textAlign:'center',
    [theme.breakpoints.down('sm')]:{

    }
}))
export {TextFieldTag,ContaitnerTag,SelectTag};