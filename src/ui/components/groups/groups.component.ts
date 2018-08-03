import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { GroupsService } from './groups.service'

import { Task } from './task.model'
import { Group } from './group.model'

import lodash from 'lodash'

@Component({
  selector: 'ui-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  providers: [GroupsService],
})
export class GroupsComponent implements OnInit {
  public groups: Group[] = []

  constructor(private router: Router, private service: GroupsService) { }

  ngOnInit() {
    /** Get data from database */
    this.service.get().subscribe((data) => {
      if (!data) return

      this.groups = Object.entries(data).map(group => new Group({
        title: group[0],
        tasks: group[1],
      }))
    })
  }

  /**
   * On checkbox change, change it in the database
   * @param event
   * @param { Group } group
   * @param { Task } task
   */
  public checkboxChange(event, group: Group, task: Task) {
    const checked = event.target.checked

    /** Clone group an check the task */
    const tasks = lodash.cloneDeep(group).tasks
    const changedTask = tasks.find(t => t.description === task.description)

    if (!!changedTask) {
      changedTask.checked = checked

      /** Update this.groups */
      this.groups.find(g => g.title === group.title).tasks = tasks
    }

    /** Send to database */
    this.service.update(group.title, tasks).subscribe()
  }

  /**
   * Delete a list
   * @param { string } groupTitle
   */
  public delete(group: Group) {
    this.service.delete(group.title).subscribe(() => {
      /** Remove deleted group from groups to update view */
      const groupsUpdated = lodash.remove(this.groups, obj => obj !== group)
      this.groups = groupsUpdated
    })
  }

  /**
   * Go to List Page and edit list
   * @param { string } groupTitle
   */
  public edit(groupTitle: string) {
    this.router.navigate(['/list', groupTitle])
  }
}
