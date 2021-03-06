import * as express from 'express'
import { Controller, Get, Post, Put, Delete, QueryParam, RequestParam, RequestBody, Request, Cookies, Session, Response, ResponseBody, SSR, TYPE } from '../util/server';
import { provideNamed, provide, inject, lazyInject, container } from '../util/ioc';
import TestManager from '../manager/testManager'

@provideNamed(TYPE.Controller, 'TestController')
@Controller('/')
class TestController {

  // 这里的 TestManager 对应 provide 提供的 TestManager, 源码中 inject 最终走到 Reflect.defineMetadata()，
  // defineMetadata 方法里比较有学问，下次再研究了，因为看到 injectable(provide) 的源码以及 inject 的源码都用到了 defineMetadata 这个 api,
  // 帅佬说需要什么供应什么都在这 api 提现
  @inject('TestManager')
  private testManager: TestManager

  @Get('test/hello')
  public async testHello() {
    const result = await this.testManager.testHello()
    return result
  }

  @Get('test/get')
  public async testGet(
    @QueryParam('abc') abc: string,
    // @Response() res: express.Response,
    // @Request() req: express.Request,
    // @Session() session: any,
  ) {
    return 'abc  ' + abc
  }

  @Post('test/post')
  public async testPost(
    @RequestBody('abc') abc: string,
    // @Session() session: any,
  ) {
    return 'abc  ' + abc
  }
}
