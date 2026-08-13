const SOURCE_MAP={EOD:'EOD',Huddle:'Morning Huddle',Today:"Today's Work",'End of Day':'EOD'};

export function normalizeTask(task={},now=new Date().toISOString(),today=now.slice(0,10)){
  const status=task.status==='done'?'done':task.status||'open';
  const createdDate=task.createdDate||(task.createdAt||'').slice(0,10)||today;
  const history=Array.isArray(task.history)&&task.history.length?task.history:[{at:task.createdAt||now,date:createdDate,event:'Created'}];
  return {...task,status,priority:task.priority||'medium',source:SOURCE_MAP[task.source]||task.source||'Manual',createdDate,carryOverCount:Number(task.carryOverCount??task.carry??0),history:status==='done'&&!history.some(event=>event.event==='Completed')?[...history,{at:task.completedAt||task.lastUpdated||now,date:task.completedDate||createdDate,event:'Completed'}]:history};
}

export function moveTaskToToday(task,today,at=new Date().toISOString()){
  if(task.status==='done'||!task.movedToHuddleDate||task.movedToHuddleDate>today||task.movedToTodayDate===today)return {task,moved:false};
  const history=Array.isArray(task.history)?task.history:[];
  return {task:{...task,movedToTodayAt:at,movedToTodayDate:today,committedDate:today,lastUpdated:at,source:"Today's Work",history:history.some(event=>event.event==='Moved to Today’s Work'&&event.date===today)?history:[...history,{at,date:today,event:'Moved to Today’s Work'}]},moved:true};
}

export function matchesCanonicalTask(task,candidates=[]){
  if(task.status==='done')return false;
  const title=String(task.title||'').trim().toLowerCase();
  return candidates.some(candidate=>candidate&&String(candidate).trim().toLowerCase()===title);
}
