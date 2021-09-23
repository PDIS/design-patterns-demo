import React, { useState, useRef } from 'react'
import {
  ThemeProvider,
  theme,
  BaseStyles,
  Box,
  Heading,
  SideNav,
  Text,
  CounterLabel,
  Label,
  Link,
  Button,
  ButtonPrimary,
  TextInput,
  Flash,
  PointerBox,
  FormGroup,
  DropdownMenu,
  DropdownButton
} from '@primer/components'
/* import { CheckIcon } from '@primer/octicons-react' */
import deepmerge from 'deepmerge'
import './fonts.css'

const customTheme = deepmerge(theme, {
  fonts: {
    normal: 'Roboto, sans-serif, Noto Sans TC'
  }
})

function HealthCard() {
  const [steps, setSteps] = useState(1)
  const [finished, setFinished] = useState([])
  const [validation, setValidation] = useState('phone')
  /*   const [idValidation, SetIDValidation] = useState(true)
  const [phoneValidation, setPhoneValidation] = useState(true)
  const [pinValidation, setPinValidation] = useState(true)
  const [accountValidation, setAccountValidation] = useState(true) */
  const [passwordValidation, setPasswordValidation] = useState(true)
  const [rePasswordValidation, setRePasswordValidation] = useState(true)
  const [mobileValidation, setMobileValidation] = useState(true)
  const [mailValidation, setMailValidation] = useState(true)
  const [component, setComponent] = useState('未檢測')
  const [reader, setReader] = useState('未檢測')
  const [healthCard, setHealthCard] = useState('未檢測')
  const [userName, setUserName] = useState('未檢測')
  const [city, setCity] = useState('')
  const [town, setTown] = useState('')
  const [village, setVillage] = useState('')

  const phone = useRef('')
  const mobile = useRef('')
  const mail = useRef('')
  const password = useRef('')
  const repassword = useRef('')
  const householdNo = useRef('')
  const neighborhood = useRef('')
  const recoveryMail = useRef('')

  const FinishLabel = () => {
    return (
      <Label outline color='text.inverse' sx={{ bg: 'bg.successInverse' }}>
        完成
      </Label>
    )
  }

  const NavLink = ({ step, text }) => {
    return (
      <SideNav.Link
        href='#'
        variant='full'
        onClick={
          Math.max(...finished) + 1 >= step ? () => setSteps(step) : undefined
        }
        selected={steps === step}
      >
        <Box>
          <CounterLabel>{step}</CounterLabel>
          <Text pl={2}>{text}</Text>
        </Box>
        <Box>{finished.includes(step) ? <FinishLabel /> : null}</Box>
      </SideNav.Link>
    )
  }

  const TopHeading = ({ text }) => {
    return (
      <Heading fontSize={4} mb={3}>
        {text}
      </Heading>
    )
  }

  const Title = ({ text }) => {
    return (
      <Heading fontSize={4} my={3}>
        {text}
      </Heading>
    )
  }

  const Dropdown = ({ items, placeholder, selectedItem, setSelectedItem }) => {
    return (
      <DropdownMenu
        renderAnchor={({
          children,
          'aria-labelledby': ariaLabelledBy,
          ...anchorProps
        }) => (
          <DropdownButton
            aria-labelledby={`favorite-color-label ${ariaLabelledBy}`}
            {...anchorProps}
          >
            {children}
          </DropdownButton>
        )}
        placeholder={placeholder}
        items={items}
        selectedItem={selectedItem}
        onChange={setSelectedItem}
      />
    )
  }

  const RequiredField = ({
    label,
    id,
    value,
    placeholder,
    validation,
    description
  }) => {
    return (
      <FormGroup>
        <FormGroup.Label htmlFor={id}>
          {label}
          <Text as='span' color='text.danger' ml={1}>
            *
          </Text>
        </FormGroup.Label>
        {description !== '' && <Text as='p'>{description}</Text>}
        <TextInput
          ref={value}
          aria-label={id}
          id={id}
          placeholder={placeholder}
          width={250}
        />
        {validation === false ? (
          <PointerBox
            mt={2}
            p={2}
            bg='bg.danger'
            borderColor='border.danger'
            caret='top-left'
            width={150}
          >
            此欄位為必填
          </PointerBox>
        ) : null}
      </FormGroup>
    )
  }

  const InputField = ({ label, id, value, placeholder, description }) => {
    return (
      <FormGroup>
        <FormGroup.Label htmlFor={id}>{label}</FormGroup.Label>
        {description !== '' && <Text as='p'>{description}</Text>}
        <TextInput
          ref={value}
          aria-label={id}
          id={id}
          placeholder={placeholder}
          width={250}
        />
      </FormGroup>
    )
  }

  const HomeButton = () => {
    return <Button onClick={() => NextStep(1)}>回首頁</Button>
  }

  const NextButton = ({ step }) => {
    return (
      <ButtonPrimary ml={3} onClick={() => NextStep(step)}>
        下一步
      </ButtonPrimary>
    )
  }

  const PreviosButton = ({ step }) => {
    return <Button onClick={() => NextStep(step)}>上一步</Button>
  }

  const NextStep = (step) => {
    finished.push(step - 1)
    setSteps(step)
  }

  const Info = () => {
    return (
      <Box width={650}>
        <Flash variant='success'>
          <Heading textAlign='center' fontSize={5} mb={2}>
            驗證成功
          </Heading>
          <Text as='p' textAlign='center'>
            手機門號身份驗證成功，預設身份驗證碼為您的手機門號前六碼
          </Text>
          <Box display='flex' justifyContent='center' flexWrap='nowrap'>
            <ButtonPrimary mt={3} onClick={() => NextStep(6)}>
              下一步
            </ButtonPrimary>
          </Box>
          <Box display='flex' justifyContent='center' flexWrap='nowrap'>
            <Link href='#' mt={3}>
              傳送驗證成功資訊至信箱
            </Link>
          </Box>
        </Flash>
      </Box>
    )
  }

  const Step1 = () => {
    return (
      <Box pt={5}>
        <TopHeading text='申請資格' />
        <Text as='p'>
          本註冊表單僅提供符合下列資格之民眾使用：
          <br />
          ．具有中華民國國籍公民
          <br />
          ．或近六個月內有定期繳納健康保險者
        </Text>
        <Title text='準備資料' />
        <Text as='p'>
          本註冊過程包含身份驗證，請先備齊註冊所需設備及文件：
          <br />
          ．健保卡
          <br />
          ．戶口名薄
          <br />
          ．讀卡機
        </Text>
        <Title text='其他申辦方式' />
        <Text as='p'>
          請攜帶本人健保卡、身分證到健保署各分區業務組及
          <br />
          聯絡辦公室即可臨櫃申請註冊，自行下載健康存摺。
        </Text>
        <Link href='#'>離我最近的申辦地點查詢</Link>
        <br />
        <br />
        <HomeButton />
        <NextButton step={2} />
      </Box>
    )
  }

  const Step2 = () => {
    const DetectOS = () => {
      var OSName = 'Unknown'
      if (window.navigator.userAgent.indexOf('Windows NT 10.0') !== -1)
        OSName = 'Windows 10'
      if (window.navigator.userAgent.indexOf('Windows NT 6.3') !== -1)
        OSName = 'Windows 8.1'
      if (window.navigator.userAgent.indexOf('Windows NT 6.2') !== -1)
        OSName = 'Windows 8'
      if (window.navigator.userAgent.indexOf('Windows NT 6.1') !== -1)
        OSName = 'Windows 7'
      if (window.navigator.userAgent.indexOf('Windows NT 6.0') !== -1)
        OSName = 'Windows Vista'
      if (window.navigator.userAgent.indexOf('Windows NT 5.1') !== -1)
        OSName = 'Windows XP'
      if (window.navigator.userAgent.indexOf('Windows NT 5.0') !== -1)
        OSName = 'Windows 2000'
      if (window.navigator.userAgent.indexOf('Mac') !== -1) OSName = 'Mac/iOS'
      if (window.navigator.userAgent.indexOf('X11') !== -1) OSName = 'UNIX'
      if (window.navigator.userAgent.indexOf('Linux') !== -1) OSName = 'Linux'
      return OSName
    }

    const DetectBrowser = () => {
      if (
        (navigator.userAgent.indexOf('Opera') ||
          navigator.userAgent.indexOf('OPR')) !== -1
      ) {
        return 'Opera'
      } else if (navigator.userAgent.indexOf('Chrome') !== -1) {
        return 'Chrome'
      } else if (navigator.userAgent.indexOf('Safari') !== -1) {
        return 'Safari'
      } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
        return 'Firefox'
      } else if (
        navigator.userAgent.indexOf('MSIE') !== -1 ||
        !!document.documentMode === true
      ) {
        return 'IE' //crap
      } else {
        return 'Unknown'
      }
    }

    const DetectReader = () => {
      setComponent('已安裝')
      setReader('讀取狀態成功')
    }

    return (
      <Box pt={5}>
        <TopHeading text='檢測電腦環境' />
        <Text as='p'>
          請依據下方顯示的瀏覽器與作業系統資訊，安裝適合的讀卡機元件。
        </Text>
        <Box color='text.secondary' bg='bg.tertiary' p={3} width={650}>
          <Text as='p'>您的作業系統：{DetectOS()}</Text>
          <Text as='p'>您的瀏覽器：{DetectBrowser()}</Text>
        </Box>
        <Title text='安裝與檢測讀卡機元件' />
        <Text as='p'>
          讀卡機元件為協助健保卡資訊讀取，下載元件安裝檔之前，請依照您的作業系統與瀏覽器環境下載讀卡機元件，並先暫停或關閉您的防毒軟體，避免下載受到阻擋或造成安裝失敗。
        </Text>
        <Box color='text.secondary' bg='bg.tertiary' p={3} my={3} width={650}>
          <Text as='p'>Windows</Text>
          <Text as='p'>Mac</Text>
          <Text as='p'>Linux (Ubuntu)</Text>
          <Text as='p'>Linux (Fedora)</Text>
        </Box>
        <Box color='text.secondary' bg='bg.tertiary' p={3} my={3} width={650}>
          <Text as='p'>請將讀卡機插上電腦USB槽，按下檢測鈕並等待環境確認</Text>
          <Button onClick={() => DetectReader()}>檢測</Button>
          <Text as='p'>元件安裝狀態：{component}</Text>
          <Text as='p'>讀卡機讀取狀態：{reader}</Text>
        </Box>
        <PreviosButton step={1} />
        <NextButton step={3} />
      </Box>
    )
  }

  const Step3 = () => {
    /* const Verify = () => {
      if (validation === 'phone') {
        setDefaultPhone(phone.current.value)
        setDefaultID(id.current.value)
        ;(id.current.value !== '') & (phone.current.value !== '') &&
          setValidation('success')
        id.current.value === '' ? SetIDValidation(false) : SetIDValidation(true)
        phone.current.value === ''
          ? setPhoneValidation(false)
          : setPhoneValidation(true)
      } else {
        setDefaultPin(pin.current.value)
        setDefaultID(id.current.value)
        ;(id.current.value !== '') & (pin.current.value !== '') &&
          setValidation('success')
        id.current.value === '' ? SetIDValidation(false) : SetIDValidation(true)
        pin.current.value === ''
          ? setPinValidation(false)
          : setPinValidation(true)
      }
    } */

    const DetectHealthCard = () => {
      setHealthCard('成功')
      setUserName('王小明')
    }

    const Cities = React.useMemo(
      () => [{ text: '台北市' }, { text: '新北市' }, { text: '台中市' }],
      []
    )

    const Towns = React.useMemo(
      () => [{ text: '中正區' }, { text: '中山區' }, { text: '士林區' }],
      []
    )

    const Villages = React.useMemo(
      () => [{ text: '水源里' }, { text: '富水里' }, { text: '文盛里' }],
      []
    )

    return (
      <Box pt={5}>
        <Heading fontSize={4} mt={3} mb={2}>
          驗證健保卡
        </Heading>
        <Text as='p'>請將健保卡插入晶片讀卡機後，按下讀取驗證健保卡</Text>
        <Box color='text.secondary' bg='bg.tertiary' p={3} my={3} width={650}>
          <Button onClick={() => DetectHealthCard()}>檢測</Button>
          <Text as='p'>健保卡讀取狀態：{healthCard}</Text>
          <Text as='p'>姓名：{userName}</Text>
        </Box>
        <FormGroup>
          <FormGroup.Label htmlFor='householdNo'>戶口名薄戶號</FormGroup.Label>
          <Text as='p'>請參考戶口名簿封面左上角的號碼</Text>
          <TextInput
            ref={householdNo}
            aria-label='戶口名薄戶號'
            id='householdNo'
            placeholder='戶口名薄戶號'
            width={250}
          />
        </FormGroup>
        <FormGroup>
          <FormGroup.Label htmlFor='householdNo'>戶籍鄉鎮里鄰</FormGroup.Label>
          <Dropdown
            placeholder='請選擇縣市'
            items={Cities}
            selectedItem={city}
            setSelectedItem={setCity}
          />
          <Dropdown
            placeholder='請選擇鄉鎮市區'
            items={Towns}
            selectedItem={town}
            setSelectedItem={setTown}
          />
          <Dropdown
            placeholder='請選擇村里'
            items={Villages}
            selectedItem={village}
            setSelectedItem={setVillage}
          />
          <TextInput
            ref={neighborhood}
            aria-label='鄰'
            id='neighborhood'
            placeholder='請輸入鄰'
            width={100}
          />
        </FormGroup>
        <PreviosButton step={2} />
        <ButtonPrimary ml={3} onClick={() => NextStep(4)}>
          驗證
        </ButtonPrimary>
      </Box>
    )
  }

  const Step4 = () => {
    const verify = () => {}
    return (
      <Box pt={5}>
        <RequiredField
          label='設定密碼'
          id='password'
          value={password}
          placeholder=''
          validation={passwordValidation}
          description='註冊密碼長度必須6-12碼，並包含英文大寫、英文小寫、數字、特殊符號(~!@#$%^&*)'
        />
        <RequiredField
          label='再次確認密碼'
          id='repassword'
          value={repassword}
          placeholder=''
          validation={rePasswordValidation}
        />
        <RequiredField
          label='行動電話'
          id='mobile'
          value={mobile}
          placeholder=''
          validation={mobileValidation}
          description='行動電話將作為未來行動裝置之認證使用，請務必輸入'
        />
        <InputField label='市話' id='phone' value={phone} placeholder='' />
        <RequiredField
          label='電子信箱'
          id='mail'
          value={mail}
          placeholder=''
          validation={mailValidation}
          description='因與微軟郵件伺服器連線異常，建議不要填寫微軟電子信箱(例如hotmail, livemail...)，以免無法收到本數寄發的信件'
        />
        <InputField
          label='備用電子信箱'
          id='recoveryMail'
          value={recoveryMail}
          placeholder=''
        />
        <PreviosButton step={3} />
        <ButtonPrimary ml={3} onClick={() => verify()}>
          儲存並前往下一步
        </ButtonPrimary>
      </Box>
    )
  }

  const Step6 = () => {
    return (
      <Box pt={5} width={650}>
        <Text as='p'>
          我同意且閱讀隱私政策。我已明確了解衛生福利部國民健康署健康存摺之規範事項及個人資料保護法權益內容，並且同意遵守所有規定及提供所需之個人資料。我已明確了解衛生福利部國民健康署署長信箱之規範事項及個人資料保護法權益內容，並且同意遵守所有規定及提供所需之個人資料。
        </Text>
        <ButtonPrimary mt={3} onClick={() => NextStep(7)}>
          下一步
        </ButtonPrimary>
      </Box>
    )
  }

  const Step7 = () => {
    return (
      <Box pt={5} width={650}>
        <Flash variant='success'>
          <Heading textAlign='center' fontSize={5} mb={2}>
            帳戶申請成功
          </Heading>
          <Text as='p' textAlign='center'>
            申請成功信件已寄出，請至您的電子信箱收信確認。
          </Text>
          <Box display='flex' justifyContent='center' flexWrap='nowrap'>
            <ButtonPrimary mt={3}>確認並回到健保署首頁</ButtonPrimary>
          </Box>
          <Box display='flex' justifyContent='center' flexWrap='nowrap'>
            <Link href='#' mt={3}>
              沒有收到信？再次傳送申請成功資訊至信箱
            </Link>
          </Box>
        </Flash>
      </Box>
    )
  }

  return (
    <ThemeProvider theme={customTheme}>
      <BaseStyles>
        <Box m={5}>
          <Box
            borderColor='border.primary'
            borderBottomWidth={1}
            borderBottomStyle='solid'
            pb={3}
          >
            <Heading fontSize={6} mb={2}>
              全民健康保險健康存摺帳戶申請
            </Heading>
          </Box>
          <Box display='grid' gridTemplateColumns='1fr 4fr' gridGap={5}>
            <Box pt={5}>
              <SideNav bordered aria-label='Main'>
                <SideNav.Link>
                  <Text>申請流程</Text>
                </SideNav.Link>
                <NavLink step={1} text='確認注意事項' />
                <NavLink step={2} text='檢測電腦環境與讀卡機' />
                <NavLink step={3} text='讀取及驗證健保卡' />
                <NavLink step={4} text='填寫資料' />
                <NavLink step={5} text='確認/編輯資料' />
                <NavLink step={6} text='送出申請' />
              </SideNav>
            </Box>
            {steps === 1 ? <Step1 /> : null}
            {steps === 2 ? <Step2 /> : null}
            {steps === 3 ? <Step3 /> : null}
            {steps === 4 ? <Step4 /> : null}
            {steps === 6 ? <Step6 /> : null}
            {steps === 7 ? <Step7 /> : null}
          </Box>
        </Box>
      </BaseStyles>
    </ThemeProvider>
  )
}

export default HealthCard
