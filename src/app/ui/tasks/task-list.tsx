'use client';

import Task from "./task";

export default function TaskList() {
    return (
        <div className="space-y-2">
            <Task title="First Task" description="This is just some seed data." status="incomplete"/>
            <Task title="First Task" description="This is just some seed data." status="incomplete"/>
            <Task title="First Task" description="This is just some seed data." status="incomplete"/>
            <Task title="First Task" description="This is just some seed data." status="incomplete"/>
            <Task title="First Task" description="This is just some seed data." status="incomplete"/>
            <Task title="First Task" description="This is just some seed data." status="incomplete"/>
            <Task title="First Task" description="This is just some seed data." status="incomplete"/>
            <Task title="First Task" description="This is just some seed data." status="incomplete"/>
            <Task title="First Task" description="This is just some seed data." status="incomplete"/>
        </div>
    )
}