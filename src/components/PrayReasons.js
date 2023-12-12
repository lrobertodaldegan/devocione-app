import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
}from 'react-native';
import {Colors} from '../utils/Colors';
import GrayButton from './GrayButton';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import CheckBox from './CheckBox';
import CheckBoxInput from './CheckBoxInput';
import { OracaoService } from '../service/OracaoService';

export default function PrayReasons() {
  const [expanded, setExpanded] = useState(true);
  const [icon, setIcon] = useState(faChevronUp);
  const [reasons, setReasons] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    OracaoService.minhasOracoes()
    .then((rs) => {
      if(rs && rs !== null && rs.length > 0){
        setReasons(rs);
      } else {
        setReasons([]);
      }
    });
  }

  const renderInput = () => {
    if(expanded === true){
      return <CheckBoxInput onSubmit={(reason) => savePrayReason(reason, false)}/>
    } else {
      return <></>
    }
  }

  const savePrayReason = (reason, checked) => {
    let r = {
      reason:reason, 
      done:checked
    };

    OracaoService.salvarOracao(r).then(() => init());
  }

  const deletePrayReason = (reason) => {
    OracaoService.removerOracao(reason).then(() => init());
  }

  const renderOptions = () => {
    if(expanded === true){
      let optsComp = [];

      reasons.map((r) => {
        optsComp.push(<CheckBox key={r.reason} 
                          label={r.reason} 
                          checked={r.done} 
                          onDeletion={deletePrayReason}
                          onSelection={(label) => savePrayReason(label, !r.done)}
                      />);
      });

      return optsComp;
    } else {
      return <></>
    }
  }

  const handlePress = () => {
    let exp = !expanded;

    setExpanded(exp);
    
    setIcon(exp === true ? faChevronUp : faChevronDown);
  }

  return (
    <View style={styles.wrap}>
      <GrayButton label='Interceder por:' 
          icon={icon} align='flex-start'
          action={() => handlePress()}/>

      {renderOptions()}

      {renderInput()}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap:{
    marginTop:10,
  },  
  input:{
    borderRadius:5,
    borderWidth:1,
    borderColor:Colors.lightGray,
    padding:10,
    marginVertical:10,
    color:Colors.blue,
    fontFamily:'JosefinSans-Regular',
  }
});