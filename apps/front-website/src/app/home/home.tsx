// import { useFeed } from '@justt/front-website/data-access-feed';
import { useState, useEffect } from 'react';
import {
  Container,
  Button,
  Input,
  Stack,
  useColorModeValue,
  Box,
  Flex,
  Text,
  IconButton,
  Collapse,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

// import { FrontWebsiteFeatureFeedList as FeedList } from '@justt/front-website/feature-feed-list';
// import { MessageWithUser } from '@justt/api-interfaces';
import { useStoreState, useStoreActions } from '../store/hooks';
import { IRoom } from '../store/models/room.model';

const DesktopBar = ({ setSearchString, submit }: BarInterface) => {
  return (
    <Input
      placeholder="Search by credit card type/currency"
      width="100%"
      onChange={(evt) => setSearchString(evt.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          submit();
        }
      }}
      mr={5}
    />
  );
};

interface BarInterface {
  setSearchString: (value: string) => void;
  submit: () => void;
}

const MobileBar = ({ setSearchString, submit }: BarInterface) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      <p>Search:</p>
      <Input
        placeholder="Search by credit card type/currency"
        width="100%"
        onChange={(evt) => setSearchString(evt.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            submit();
          }
        }}
        mr={5}
      />
      <Button
        display={{ base: 'none', md: 'inline-flex' }}
        fontSize={'sm'}
        fontWeight={600}
        color={'white'}
        bg={'pink.400'}
        _hover={{
          bg: 'pink.300',
        }}
        onClick={() => {
          submit();
        }}
      >
        Search
      </Button>
    </Stack>
  );
};

export function Home() {
  const { rooms } = useStoreState((store) => store['roomsModel']);
  const roomName = useStoreState((store) => store['roomModel'].name);
  const userName = useStoreState((store) => store['userModel'].name);
  const fetchRooms = useStoreActions((actions) => actions['roomsModel'].fetch);
  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line
  }, []);
  // const { updateDataThunk } = useStoreActions((store) => store.roomModel);
  const [inputName, setInputName] = useState('');
  const [inputCourse, setInputCourse] = useState('');

  const { isOpen, onToggle } = useDisclosure();
  // const [feed, setFeed] = useState<MessageWithUser[]>([]);
  const [searchString, setSearchString] = useState('');
  // const [fetchSearchString, setFetchSearchString] = useState('');
  // const feedData = useFeed(fetchSearchString);
  const submit = () => {
    console.log(searchString);
    // setFetchSearchString(searchString);
  };

  // useEffect(() => {
  //   setFeed(feedData);
  // }, [feedData, setFeed]);

  return (
    <>
      <Box>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}
        >
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              display={'flex'}
              alignItems="center"
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}
            >
              JusTT
            </Text>

            <Flex display={{ base: 'none', md: 'flex' }} width="100%" ml={10}>
              <DesktopBar setSearchString={setSearchString} submit={submit} />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
          >
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'pink.400'}
              _hover={{
                bg: 'pink.300',
              }}
              onClick={submit}
            >
              Search
            </Button>
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileBar setSearchString={setSearchString} submit={submit} />
        </Collapse>
      </Box>
      <Container maxW={'7xl'}>
        <Box>Rooms</Box>
        <ul>
          {rooms.map((room: IRoom) => (
            <li>{room.name}</li>
          ))}
        </ul>
      </Container>
    </>
  );
}

export default Home;
