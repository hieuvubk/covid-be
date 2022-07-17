import { Model, Types } from 'mongoose';
import { Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Day, DayDocument, DaySchema } from 'src/models/day.schema';
import * as fs from 'fs';

@Injectable()
export class DayService {
  constructor(
    @InjectModel(Day.name) private dayModel: Model<DayDocument>,
  ) {}

  async create(): Promise<boolean> {
    const self = this
    fs.readFile('src/public/data.json', 'utf8', (error, data) => {
      // 2
      if (error) {
        console.log(`ERROR: ${error}`)
        return false
      }
      // 3
      const jsonData = JSON.parse(data)
      Object.keys(jsonData).map(function(key, index) {
        const stateData = jsonData[key]
        Object.keys(stateData["dates"]).map(function(childKey, childIndex) {
          const total = stateData["dates"][childKey]["total"]
          if(total) {
            const dayData = {
              date: childKey,
              state: key,
              confirmed: total["confirmed"] ? total["confirmed"] : 0,
              recovered: total["recovered"] ? total["recovered"] : 0,
              tested: total["tested"] ? total["tested"] : 0,
              vaccinated1: total["vaccinated1"] ? total["vaccinated1"] : 0,
              vaccinated2: total["vaccinated2"] ? total["vaccinated2"] : 0,
            }
            const dayModel = new self.dayModel(dayData)
            dayModel.save()
          }
        })
      })
    })
    return true
  }

  async getAll(): Promise<Day[]> {
    return this.dayModel.find().exec();
  }

  async getByDate(date: string): Promise<Day[]> {
    return this.dayModel.find({date: date}).exec();
  }

  async getTotalByDate(date: string): Promise<any> {
    const res = {
      confirmed: 0,
      recovered: 0,
      deceased: 0,
      tested: 0,
    }
    const data = await this.dayModel.find({date: date}).exec();
    data.map((day) => {
      res.confirmed += day.confirmed
      res.recovered += day.recovered
      res.deceased += day.deceased
      res.tested += day.tested
    })
    return res;
  }

  async getByState(state: string): Promise<Day[]> {
    return this.dayModel.find({state: state}).exec();
  }
}
