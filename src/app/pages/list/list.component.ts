import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { GroupsService } from '../../../ui/components/groups/groups.service'

import { Group } from '../../../ui/components/groups/group.model'
import { Task } from '../../../ui/components/groups/task.model'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [GroupsService],
})
export class ListComponent implements OnDestroy, OnInit {
  public group: Group = new Group()

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: GroupsService,
  ) { }

  ngOnInit() {
    this.addTask()

    this.route.params.subscribe((params) => {
      if (!params.list) return

      /** Get data from database */
      this.service.get(params.list).subscribe((data) => {
        if (!data) return

        this.group.title = params.list

        this.group.tasks = Object.entries(data).map(t => new Task({
          description: t[0],
          checked: t[1],
        }))
      })
    })
  }

  ngOnDestroy() {
    this.group = new Group()
  }

  public addTask() {
    this.group.tasks.push(new Task())
  }

  public changeDescription(event, i) {
    if (!event) {
      this.remove(i)
      return
    }

    this.group.tasks[i].description = event
    this.group.tasks[i].checked = false
  }

  public remove(i) {
    this.group.tasks.splice(i, 1)
  }

  public save() {
    this.service.update(this.group.title, this.group.tasks).subscribe(
      () => this.router.navigateByUrl('/'))
  }
}
