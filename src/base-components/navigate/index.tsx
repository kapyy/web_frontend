import { useNavigate as _useNavigate } from 'react-router'

export * from 'react-router'

export { BrowserRouter as Router, createBrowserRouter } from 'react-router-dom'

export const useNavigate = () => {
  // 先封装，以后方便扩展
  return _useNavigate()
}
