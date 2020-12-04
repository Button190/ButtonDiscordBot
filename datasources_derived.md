# important stream ids

derived:com.google.sleep.segment:com.google.android.gms:merged

- runtastic
derived:com.google.speed.summary:com.runtastic.android:
derived:com.google.heart_rate.summary:com.runtastic.android:

# other dataStreamIds:

derived:com.google.active_minutes:com.google.android.gms:from_activity\u003c-merge_activity_segments
derived:com.google.active_minutes:com.google.android.gms:from_steps\u003c-estimated_steps
derived:com.google.active_minutes:com.google.android.gms:merge_active_minutes

derived:com.google.activity.segment:com.google.android.gms:merge_activity_segments
derived:com.google.activity.segment:com.google.android.gms:session_activity_segment
derived:com.google.activity.segment:com.runtastic.android:
derived:com.google.activity.segment:com.runtastic.android:session_activity_segment
derived:com.google.activity.segment:com.xiaomi.hm.health:session_activity_segment

derived:com.google.calories.bmr:com.google.android.gms:merged
derived:com.google.calories.expended:com.google.android.gms:from_activities
derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended
derived:com.google.calories.expended:com.google.android.gms:platform_calories_expended
derived:com.google.calories.expended:com.runtastic.android:

derived:com.google.distance.delta:com.google.android.gms:from_steps\u003c-merge_step_deltas
derived:com.google.distance.delta:com.google.android.gms:merge_distance_delta
derived:com.google.distance.delta:com.google.android.gms:pruned_distance
derived:com.google.distance.delta:com.google.android.gms:platform_distance_delta
derived:com.google.distance.delta:com.runtastic.android:

derived:com.google.heart_minutes:com.google.android.gms:from_activity\u003c-merge_activity_segments
derived:com.google.heart_minutes:com.google.android.gms:from_heart_rate\u003c-merge_heart_rate_bpm
derived:com.google.heart_minutes:com.google.android.gms:from_steps\u003c-estimated_steps
derived:com.google.heart_minutes:com.google.android.gms:merge_heart_minutes


derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm
derived:com.google.heart_rate.bpm:com.google.android.gms:resting_heart_rate\u003c-merge_heart_rate_bpm



derived:com.google.speed:com.google.android.gms:from_distance\u003c-merge_distance_delta
derived:com.google.speed:com.google.android.gms:merge_speed

derived:com.google.step_count.delta:com.google.android.gms:estimated_steps
derived:com.google.step_count.delta:com.google.android.gms:merge_step_deltas