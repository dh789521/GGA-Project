package com.gga.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.gga.service.MemberService;
import com.gga.vo.MemberVo;
import com.gga.vo.SessionVo;

@Controller
public class LoginController {
	
	@Autowired
	private MemberService memberService;
	
	/**
	 * logout.do - 로그아웃 매핑
	 */
	@RequestMapping(value="/logout.do", method=RequestMethod.GET)
	public ModelAndView logout(HttpSession session) {
		ModelAndView mav = new ModelAndView();
		SessionVo svo = (SessionVo)session.getAttribute("svo");
		
		if (svo != null) {
			session.invalidate();
			mav.addObject("logout_result", "success");
		}
		
		mav.setViewName("index");
		
		return mav;
	}
	
	/**
	 * login.do - 로그인
	 */
	@RequestMapping(value="/login.do", method=RequestMethod.GET)
	public String login() {
		return "/login/login";
	}
	
	/**
	 * login_fail.do - 로그인 실패
	 */
	@RequestMapping(value="/login_fail.do", method=RequestMethod.GET)
	public String login_fail() {
		return "/login/login_fail";
	}
	
	/**
	 * loginProc - 로그인 처리
	 */
	@RequestMapping(value="/loginProc.do", method=RequestMethod.POST)
	public ModelAndView loginProc(MemberVo memberVo, HttpSession session) {
		ModelAndView model = new ModelAndView();
		
		SessionVo svo = memberService.getLogin(memberVo);
		
		if(svo.getLoginResult() == 1) {
			session.setAttribute("svo", svo);
			model.addObject("loginResult", "ok");
			model.setViewName("index");
		} else {
			model.setViewName("redirect:/login_fail.do");
		}
		
		return model; 
	}
	
	/*
	 * login_idFind - 아이디 찾기
	 */
	@RequestMapping(value="/login_idFind.do", method=RequestMethod.GET)
	public String login_idFind() {
		return "/login/login_idFind";
	}
	
	/*
	 * login_idFind_proc
	 */
	@RequestMapping(value="/login_idFind_proc.do", method=RequestMethod.GET)
	@ResponseBody
	public String login_idFind_proc(MemberVo memberVo) {
		return memberService.findId(memberVo);
	}
	
	/*
	 * login_pwFind - 비밀번호 찾기
	 */
	@RequestMapping(value="/login_pwFind.do", method=RequestMethod.GET)
	public String login_pwFind() {
		return "/login/login_pwFind";
	}
	
	/*
	 * login_pwFind_proc 비밀번호 찾기 후 수정
	 */
	@RequestMapping(value="/login_pwFind_proc.do", method=RequestMethod.GET)
	@ResponseBody
	public String login_pwFind_proc(MemberVo memberVo) {
		return memberService.findPw(memberVo);
	}
	
}
