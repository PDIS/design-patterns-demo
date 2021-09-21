import React, { useState, useRef, useCallback } from 'react'
import {
  ThemeProvider, theme, BaseStyles, Box, Heading, SideNav, Text, CounterLabel, Label, Link,
  Button, ButtonPrimary, TextInput, Flash, PointerBox, FormGroup, Dropdown
} from '@primer/components'
import deepmerge from 'deepmerge'
import './fonts.css'

const customTheme = deepmerge(theme, {
  fonts: {
    normal: 'Roboto, sans-serif, Noto Sans TC'
  }
})

function App() {
  const [steps, setSteps] = useState(1)
  const [finished, setFinished] = useState([])
  const [validation, setValidation] = useState('phone')
  const [idValidation, SetIDValidation] = useState(true)
  const [phoneValidation, setPhoneValidation] = useState(true)
  const [pinValidation, setPinValidation] = useState(true)
  const [accountValidation, setAccountValidation] = useState(true)
  const [defaultID, setDefaultID] = useState('')
  const [defaultPhone, setDefaultPhone] = useState('')
  const [defaultPin, setDefaultPin] = useState('')
  const id = useRef('');
  const phone = useRef('');
  const pin = useRef('');
  const account = useRef('');
  const name = useRef('');
  const gender = useRef('');
  const mail = useRef('');
  const contact = useRef('');
  const password = useRef('');


  const FinishLabel = () => {
    return (
      <Label outline color="text.success" borderColor="text.success">完成</Label>
    )
  }

  const NextStep = (step) => {
    finished.push(step - 1)
    setSteps(step)
  }

  const ChangeValidation = (event) => {
    setValidation(event.target.value);
  }

  const ChangeGender = (event) => {
    /* setGender(event.target.value) */
  }

  const Step1 = () => {
    return (
      <Box pt={5}>
        <Heading fontSize={4} mb={2}>申請資格</Heading>
        <Text as='p' >本註冊表單僅提供符合下列資格之民眾使用：
          <br />．具有中華民國國籍公民<br />．或近六個月內有定期繳納健康保險者</Text>
        {/*         <Link href="#">
          如何查看我是否具有中華民國國籍？
        </Link>
        <br />
        <Link href="#">
          如何查看我是否定期繳納健康保險？
        </Link> */}
        <Heading fontSize={4} mt={3} mb={2}>準備資料</Heading>
        <Text as='p' >本註冊過程包含身份驗證，您可以選擇以下驗證方式：
          <br />1. 以插卡驗證身份：<br />．健保卡或自然人憑證擇一<br />．讀卡機<br />．依照您的作業系統版本選擇元件安裝檔
          <br />2. 以手機驗證碼驗證身份：<br />．本服務限本國籍人士使用本人申辦之月租型手機門號及個人行動網路</Text>
        <Link href="#">
          下載元件安裝檔
        </Link>
        <br />
        <Link href="#">
          常見問題
        </Link><br />
        <Link href="#">
          什麼是驗證碼？
        </Link>
        <br />
        <Link href="#">
          網站資訊安全？
        </Link>
        <Heading fontSize={4} mt={3} mb={2}>其他申辦方式</Heading>
        <Text as='p' >請攜帶本人健保卡、身分證到健保署各分區業務組及<br />
          聯絡辦公室即可臨櫃申請註冊，自行下載健康存摺。</Text>
        <Button onClick={() => NextStep(2)}>回首頁</Button>
        <ButtonPrimary ml={3} onClick={() => NextStep(2)}>下一步</ButtonPrimary>
      </Box>
    )
  }

  const Step2 = () => {
    return (
      <Box pt={5} >
        <Text as='p' >請選擇驗證方式<Text as='span' color="text.tertiary"> (必填)</Text></Text>
        <label>
          <input
            type="radio"
            name="validation"
            value="phone"
            checked={validation === "phone"}
            onChange={(event) => ChangeValidation(event)}
          />
          手機驗證碼驗證
        </label>
        <Text as='p' >本服務限本國籍人士使用本人申辦之月租型手機門號及個人行動網路</Text>
        <label>
          <input
            type="radio"
            name="validation"
            value="id"
            checked={validation === "id"}
            onChange={(event) => ChangeValidation(event)}
          />
          健保卡/自然人憑證插卡驗證
        </label>
        <Text as='p' >請準備健保卡或自然人憑證、讀卡機，病檢查左側環境支援情形，排除錯誤請至xxxxxxx</Text>
        <ButtonPrimary onClick={() => NextStep(3)}>下一步</ButtonPrimary>
      </Box>
    )
  }

  const Step3 = () => {
    const PhoneView = () => {
      return (
        <Box>
          <FormGroup>
            <FormGroup.Label htmlFor="phone">手機門號<Text as='span' color="text.tertiary" > (必填)</Text></FormGroup.Label>
            <TextInput ref={phone} defaultValue={defaultPhone} aria-label="手機門號" id="phone" placeholder="手機門號" width={250} />
            {phoneValidation === false ? <PointerBox mt={2} p={2} bg="bg.danger" borderColor="border.danger" caret="top-left" width={150}>此欄位為必填</PointerBox> : null}
          </FormGroup>
          <FormGroup>
            <FormGroup.Label htmlFor="id">身分證字號<Text as='span' color="text.tertiary"> (必填，英文字母為大寫)</Text></FormGroup.Label>
            <TextInput ref={id} defaultValue={defaultID} aria-label="身分證字號" id="id" placeholder="身分證字號" width={250} />
            {idValidation === false ? <PointerBox mt={2} p={2} bg="bg.danger" borderColor="border.danger" caret="top-left" width={150}>此欄位為必填</PointerBox> : null}
          </FormGroup>
          <ButtonPrimary mt={3} onClick={() => Verify()}>驗證</ButtonPrimary>
        </Box>
      )
    }

    const IDView = () => {
      return (
        <Box>
          <FormGroup>
            <FormGroup.Label htmlFor="status">卡片讀取狀態</FormGroup.Label>
            <TextInput aria-label="成功讀取狀態" id="status" placeholder="成功讀取狀態" width={250} contrast readOnly />
          </FormGroup>
          <FormGroup>
            <FormGroup.Label htmlFor="pin">PIN碼<Text as='span' color="text.tertiary"> (必填)</Text></FormGroup.Label>
            <TextInput ref={pin} defaultValue={defaultPin} aria-label="PIN碼" id="pin" placeholder="PIN碼" width={250} />
            {pinValidation === false ? <PointerBox mt={2} p={2} bg="bg.danger" borderColor="border.danger" caret="top-left" width={150}>此欄位為必填</PointerBox> : null}
          </FormGroup>
          <FormGroup>
            <FormGroup.Label htmlFor="id" >身分證字號<Text as='span' color="text.tertiary"> (必填，英文字母為大寫)</Text></FormGroup.Label>
            <TextInput ref={id} defaultValue={defaultID} aria-label="身分證字號" id="id" placeholder="身分證字號" width={250} />
            {idValidation === false ? <PointerBox mt={2} p={2} bg="bg.danger" borderColor="border.danger" caret="top-left" width={150}>此欄位為必填</PointerBox> : null}
          </FormGroup>
          <ButtonPrimary mt={3} onClick={() => Verify()}>驗證</ButtonPrimary>
        </Box>
      )
    }

    const SuccessView = () => {
      return (
        <Box width={650}>
          <Flash variant="success">
            <Heading textAlign="center" fontSize={5} mb={2}>驗證成功</Heading>
            <Text as='p' textAlign="center">手機門號身份驗證成功，預設身份驗證碼為您的手機門號前六碼</Text>
            <Box display="flex" justifyContent="center" flexWrap="nowrap">
              <ButtonPrimary mt={3} onClick={() => NextStep(6)} >下一步</ButtonPrimary>
            </Box>
            <Box display="flex" justifyContent="center" flexWrap="nowrap">
              <Link href="#" mt={3} >傳送驗證成功資訊至信箱</Link>
            </Box>
          </Flash>
        </Box>
      )
    }

    const Verify = () => {
      if (validation === 'phone') {
        setDefaultPhone(phone.current.value)
        setDefaultID(id.current.value)
        id.current.value !== '' & phone.current.value !== '' && setValidation('success')
        id.current.value === '' ? SetIDValidation(false) : SetIDValidation(true)
        phone.current.value === '' ? setPhoneValidation(false) : setPhoneValidation(true)
      } else {
        setDefaultPin(pin.current.value)
        setDefaultID(id.current.value)
        id.current.value !== '' & pin.current.value !== '' && setValidation('success')
        id.current.value === '' ? SetIDValidation(false) : SetIDValidation(true)
        pin.current.value === '' ? setPinValidation(false) : setPinValidation(true)
      }
    }

    return (
      <Box pt={5} >
        {validation === 'phone' && PhoneView()}
        {validation === 'id' && IDView()}
        {validation === 'success' && SuccessView()}
      </Box >
    )
  }

  const Step4 = () => {
    return (
      <Box pt={5} >
        <FormGroup>
          <FormGroup.Label htmlFor="account">帳號<Text as='span' color="text.tertiary"> (必填，帳號需包含一個大寫英文字)</Text></FormGroup.Label>
          <TextInput ref={account} aria-label="帳號" id="account" placeholder="帳號" width={250} />
          {accountValidation === false ? <PointerBox mt={2} p={2} bg="bg.danger" borderColor="border.danger" caret="top-left" width={150}>此欄位為必填</PointerBox> : null}
        </FormGroup>
        <FormGroup>
          <FormGroup.Label htmlFor="name">姓名<Text as='span' color="text.tertiary"> (必填)</Text></FormGroup.Label>
          <TextInput ref={name} aria-label="姓名" id="name" placeholder="姓名" width={250} />
          {accountValidation === false ? <PointerBox mt={2} p={2} bg="bg.danger" borderColor="border.danger" caret="top-left" width={150}>此欄位為必填</PointerBox> : null}
        </FormGroup>
        <FormGroup>
          <FormGroup.Label htmlFor="gender">姓別<Text as='span' color="text.tertiary"> (必填)</Text></FormGroup.Label>
          <label>
            <input
              type="radio"
              name="gender"
              value="m"
              checked={gender === "m"}
              onChange={(event) => ChangeGender(event)}
            />
            男
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="f"
              checked={gender === "f"}
              onChange={(event) => ChangeGender(event)}
            />
            女
          </label>
        </FormGroup>
        <FormGroup>
          <FormGroup.Label htmlFor="birthday">生日<Text as='span' color="text.tertiary"> (必填)</Text></FormGroup.Label>
          <Dropdown width={200}>
            <Dropdown.Button></Dropdown.Button>
            <Dropdown.Menu direction="sw">
              <Dropdown.Item>民國77年(西元1988年)</Dropdown.Item>
              <Dropdown.Item>民國78年(西元1989年)</Dropdown.Item>
              <Dropdown.Item>民國79年(西元1990年)</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </FormGroup>
      </Box>
    )
  }

  const Step6 = () => {
    return (
      <Box pt={5} width={650}>
        <Text as='p' >我同意且閱讀隱私政策。我已明確了解衛生福利部國民健康署健康存摺之規範事項及個人資料保護法權益內容，並且同意遵守所有規定及提供所需之個人資料。我已明確了解衛生福利部國民健康署署長信箱之規範事項及個人資料保護法權益內容，並且同意遵守所有規定及提供所需之個人資料。</Text>
        <ButtonPrimary mt={3} onClick={() => NextStep(7)} >下一步</ButtonPrimary>
      </Box>
    )
  }

  const Step7 = () => {
    return (
      <Box pt={5} width={650}>
        <Flash variant="success">
          <Heading textAlign="center" fontSize={5} mb={2}>帳戶申請成功</Heading>
          <Text as='p' textAlign="center">申請成功信件已寄出，請至您的電子信箱收信確認。</Text>
          <Box display="flex" justifyContent="center" flexWrap="nowrap">
            <ButtonPrimary mt={3}>確認並回到健保署首頁</ButtonPrimary>
          </Box>
          <Box display="flex" justifyContent="center" flexWrap="nowrap">
            <Link href="#" mt={3} >沒有收到信？再次傳送申請成功資訊至信箱</Link>
          </Box>
        </Flash>
      </Box>
    )
  }

 /*  const Step3B = () => {
    return (
      <Box pt={5} >
        <form onSubmit={() => handleSubmit()}>
          <Text as='p' >卡片讀取狀態</Text>
          <TextInput aria-label="成功讀取狀態" name="phone" placeholder="成功讀取狀態" contrast readOnly />
          <Text as='p' >PIN碼<Text as='span' color="text.tertiary"> (必填)</Text></Text>
          <TextInput aria-label="PIN碼" name="id" placeholder="PIN碼" />
          <Text as='p' >身分證字號<Text as='span' color="text.tertiary"> (必填，英文字母為大寫)</Text></Text>
          <TextInput aria-label="身分證字號" name="id" placeholder="身分證字號" />
          <br />
          <ButtonPrimary type="submit" mt={3}>驗證</ButtonPrimary>
        </form>
      </Box>
    )
  } */



  return (
    <ThemeProvider theme={customTheme}>
      <BaseStyles>
        <Box m={5}>
          <Box borderColor="border.primary" borderBottomWidth={1} borderBottomStyle="solid" pb={3}>
            <Heading fontSize={6} mb={2}>全民健康保險健康存摺帳戶申請</Heading>
          </Box>
          <Box display="grid" gridTemplateColumns="1fr 5fr" gridGap={5}>
            <Box pt={5}>
              <SideNav bordered maxWidth={280} aria-label="Main">
                <SideNav.Link Width={280}>
                  <Text>申請流程</Text>
                </SideNav.Link>
                <SideNav.Link href="#" variant="full" onClick={() => setSteps(1)} selected={steps === 1}>
                  <Box>
                    <CounterLabel>1</CounterLabel>
                    <Text pl={2}>確認注意事項</Text>
                  </Box>
                  <Box>
                    {finished.includes(1) ? <FinishLabel /> : null}
                  </Box>
                </SideNav.Link>
                <SideNav.Link href="#" variant="full" onClick={() => setSteps(2)} selected={steps === 2}>
                  <Box>
                    <CounterLabel>2</CounterLabel>
                    <Text pl={2}>選擇驗證身分方式</Text>
                  </Box>
                  <Box>
                    {finished.includes(2) ? <FinishLabel /> : null}
                  </Box>
                </SideNav.Link>
                <SideNav.Link href="#" variant="full" onClick={() => setSteps(3)} selected={steps === 3}>
                  <Box><CounterLabel>3</CounterLabel><Text pl={2}>驗證身分</Text></Box>
                  <Box> {finished.includes(3) ? <FinishLabel /> : null}</Box>
                </SideNav.Link>
                <SideNav.Link href="#" variant="full" onClick={() => setSteps(4)} selected={steps === 4}>
                  <Box><CounterLabel>4</CounterLabel><Text pl={2}>填寫資料</Text></Box>
                  <Box> {finished.includes(4) ? <FinishLabel /> : null}</Box>
                </SideNav.Link>
                <SideNav.Link href="#" variant="full" onClick={() => setSteps(5)} selected={steps === 5}>
                  <Box><CounterLabel>5</CounterLabel><Text pl={2}>確認/編輯資料</Text></Box>
                  <Box> {finished.includes(5) ? <FinishLabel /> : null}</Box>
                </SideNav.Link>
                <SideNav.Link href="#" variant="full" onClick={() => setSteps(6)} selected={steps === 6}>
                  <Box><CounterLabel>6</CounterLabel><Text pl={2}>送出申請</Text></Box>
                  <Box> {finished.includes(6) ? <FinishLabel /> : null}</Box>
                </SideNav.Link>
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

export default App
