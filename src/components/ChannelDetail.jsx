import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFromAPI';

import {Videos, ChannelCard} from './';

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail ] = useState(null);
  const [videos, setVideos ] = useState([]);
  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
    .then((data) => setChannelDetail(data?.items[0]));

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
    .then((data) => setVideos(data?.items));
  },[id])
  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: 'radial-gradient(circle,rgba(63, 94, 251, 1) 0%, rgba(169, 73, 174, 1) 52%, rgba(177, 71, 168, 1) 56%, rgba(218, 63, 139, 1) 76%, rgba(237, 59, 125, 1) 85%, rgba(252, 70, 107, 1) 100%)',
          zIndex: 10,
          height: '300px'
        }}
        />
        <ChannelCard channelDetail={channelDetail} 
        marginTop="-110px"/>
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: '100px' }}} />
          <Videos videos={videos}/>
        
      </Box>
    </Box>
  )
}

export default ChannelDetail
