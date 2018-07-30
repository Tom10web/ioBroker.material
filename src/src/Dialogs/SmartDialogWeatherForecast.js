/**
 * Copyright 2018 bluefox <dogafox@gmail.com>
 *
 * Licensed under the Creative Commons Attribution-NonCommercial License, Version 4.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://creativecommons.org/licenses/by-nc/4.0/legalcode.txt
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Utils from '../Utils';
import SmartDialogGeneric from './SmartDialogGeneric';
import I18n from '../i18n';

const HEIGHT_HEADER  = 64;
const HEIGHT_CURRENT = 200;
const HEIGHT_DAY     = 140;
const HEIGHT_CHART   = 160;

const styles = {
    'header-div': {
        width: 'calc(100% - 1em)',
        position: 'relative',
        marginBottom: 16
    },
    'current-div': {
        height: HEIGHT_CURRENT,
        width: 'calc(100% - 1em)',
        position: 'relative',
        marginBottom: 16
    },
    'currentIcon-div': {
        position: 'absolute',
        width: 128,
        height: 128,
        zIndex: 0,
        left: 3,
        top: 24
    },
    'currentIcon-icon': {
        width: '100%',
        zIndex: 0
    },
    'currentIcon-temperature': {
        position: 'absolute',
        width: '100%',
        fontSize: 40,
        zIndex: 1,
        fontWeight: 'normal',
        textAlign: 'right',
        color: '#9c9c9c',
        top: 8,
        right: -50
    },
    'currentDate-div': {
        position: 'absolute',
        zIndex: 1,
        width: 'calc(100% - 2em)',
        top: 16,
        left: 16
    },
    'currentDate-date': {
        fontWeight: 'normal',
        display: 'inline-block',
    },
    'currentDate-location': {
        display: 'inline-block',
        position: 'absolute',
        textOverflow: 'ellipsis',
        width: 'calc(100% - 75px)',
        whiteSpace: 'nowrap',
        right: 0,
        textAlign: 'right'
    },
    'todayTemp-div': {
        position: 'absolute',
        zIndex: 1,
        fontWeight: 'normal',
        top: 35,
        maxWidth: 'calc(100% - 2em - 90px)',
        right: 16,
        textAlign: 'right'
    },
    'todayTemp-temperature': {
    },
    'todayTemp-temperatureMin': {
    },
    'todayTemp-temperatureMax': {
        fontWeight: 'bold'
    },
    'todayTemp-temperatureTitle': {
    },
    'todayTemp-temperatureValue': {
    },
    'todayTemp-precipitation': {
    },
    'todayTemp-precipitationTitle': {
    },
    'todayTemp-precipitationValue': {
        paddingLeft: 2
    },
    'todayTemp-pressure': {
    },
    'todayTemp-pressureTitle': {
    },
    'todayTemp-pressureValue': {
        paddingLeft: 2
    },
    'todayState-div': {
        position: 'absolute',
        zIndex: 1,
        width: 'calc(100% - 90px)',
        fontWeight: 'normal',
        bottom: 16,
        left: 118,
        textAlign: 'left',
        fontSize: 14
    },
    'todayState-wind': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    'todayState-windTitle': {
    },
    'todayState-windDir': {
        marginLeft: 2,
    },
    'todayState-windSpeed': {
        marginLeft: 2
    },
    'todayState-windIcon': {
        display: 'inline-block',
        marginLeft: 5
    },
    'todayState-windChill': {
    },
    'todayState-windChillTitle': {
        paddingRight: 5
    },
    'todayState-windChillValue': {
    },
    'todayState-humidity': {
    },
    'todayState-humidityTitle': {
        paddingRight: 5
    },
    'todayState-humidityValue': {
    },
    'todayState-state': {
    },
    'chart-div': {
        height: HEIGHT_CHART,
        width: 'calc(100% - 1em)',
        overflowX: 'hidden',
        overflowY: 'auto',
        marginBottom: 16,
        padding: '0 16px',
        cursor: 'pointer'
    },
    'chart-header': {
        width: '100%',
        fontSize: 16,
        paddingTop: 16,
        fontWeight: 'bold'
    },
    'chart-img': {
        width: 'calc(100% - 16px)',
    },
    'chart-dialog': {
        zIndex: 2101
    },
    'chart-dialog-paper': {
        width: 'calc(100% - 4em)',
        maxWidth: 'calc(100% - 4em)',
    },
    'chart-dialog-img': {
        width: '100%',
    },
    'chart-dialog-content': {
        textAlign: 'center',
    },

    'days-div': {
        height: 'calc(100% - ' + HEIGHT_CURRENT + 'px - ' + HEIGHT_HEADER + 'px)',
        width: 'calc(100% - 1em)',
        overflowX: 'hidden',
        overflowY: 'auto'
    },
    'day-div': {
        height: HEIGHT_DAY,
        width: '100%',
        marginBottom: 16,
        position: 'relative'
    },
    'dayIcon-div': {
        position: 'absolute',
        width: 90,
        height: 90,
        zIndex: 0,
        left: 16,
        top: 30
    },
    'dayIcon-icon': {
        width: '100%',
        zIndex: 0
    },
    'dayIcon-temperature': {
        position: 'absolute',
        width: '100%',
        fontSize: 40,
        zIndex: 1,
        fontWeight: 'normal',
        textAlign: 'right',
        color: '#9c9c9c',
        top: 8,
        right: -50
    },
    'dayDate-div': {
        position: 'absolute',
        zIndex: 1,
        width: 'calc(100% - 2em)',
        top: 16,
        left: 16
    },
    'dayDate-date': {
        fontWeight: 'bold',
        display: 'inline-block',
    },
    'dayTemp-div': {
        position: 'absolute',
        zIndex: 1,
        fontWeight: 'normal',
        top: 35,
        maxWidth: 'calc(100% - 2em - 90px)',
        right: 16,
        textAlign: 'right'
    },
    'dayTemp-temperature': {
    },
    'dayTemp-temperatureMin': {
    },
    'dayTemp-temperatureMax': {
        fontWeight: 'bold'
    },
    'dayTemp-temperatureTitle': {
    },
    'dayTemp-temperatureValue': {
    },
    'dayTemp-precipitation': {
    },
    'dayTemp-precipitationTitle': {
    },
    'dayTemp-precipitationValue': {
        paddingLeft: 2
    },
    'dayTemp-humidity': {
    },
    'dayTemp-humidityTitle': {
    },
    'dayTemp-humidityValue': {
        paddingLeft: 2
    },
    'dayTemp-pressure': {
    },
    'dayTemp-pressureTitle': {
    },
    'dayTemp-pressureValue': {
        paddingLeft: 2
    },
    'dayState-div': {
        position: 'absolute',
        zIndex: 1,
        width: 'calc(100% - 90px)',
        fontWeight: 'normal',
        bottom: 16,
        left: 118,
        textAlign: 'left'
    },
    'dayState-wind': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        fontSize: 14
    },
    'dayState-windTitle': {
    },
    'dayState-windDir': {
        marginLeft: 2,
    },
    'dayState-windSpeed': {
        marginLeft: 2
    },
    'dayState-windIcon': {
        display: 'inline-block',
        marginLeft: 5
    },
    'dayState-windChill': {
    },
    'dayState-windChillTitle': {
        paddingRight: 5
    },
    'dayState-windChillValue': {
    },
    'dayState-state': {
        fontSize: 14
    },

};

class SmartDialogWeatherForecast extends SmartDialogGeneric  {
    // expected:
    static propTypes = {
        name:               PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        dialogKey:          PropTypes.string.isRequired,
        windowWidth:        PropTypes.number,
        onClose:            PropTypes.func.isRequired,
        objects:            PropTypes.object,
        states:             PropTypes.object,
        onCollectIds:       PropTypes.func,
        enumNames:          PropTypes.array,
        ids:                PropTypes.object.isRequired,
        settings:           PropTypes.object
    };

    constructor(props) {
        super(props);

        this.ids = this.props.ids;

        for (const id in this.ids.current) {
            if (this.ids.current.hasOwnProperty(id) && this.ids.current[id]) {
                this.subscribes = this.subscribes || [];
                if (this.ids.current[id] instanceof Array) {
                    this.ids.current[id].forEach(i => this.subscribes.push(i));
                } else {
                    this.subscribes.push(this.ids.current[id]);
                }
            }
        }
        for (let d = 0; d < this.ids.days.length; d++) {
            if (!this.ids.days[d]) continue;
            for (const id in this.ids.days[d]) {
                if (this.ids.days[d].hasOwnProperty(id) && this.ids.days[d][id]) {
                    this.subscribes = this.subscribes || [];
                    this.subscribes.push(this.ids.days[d][id]);
                }
            }
        }
        if (this.props.settings) {
            if (this.props.settings.tempID && this.subscribes.indexOf(this.props.settings.tempID) === -1)  {
                this.subscribes = this.subscribes || [];
                this.subscribes.push(this.props.settings.tempID);
            }
            if (this.props.settings.humidityID && this.subscribes.indexOf(this.props.settings.humidityID) === -1)  {
                this.subscribes = this.subscribes || [];
                this.subscribes.push(this.props.settings.humidityID);
            }
        }

        this.stateRx.chartOpened = false;

        this.setMaxHeight();

        const enums = [];
        this.props.enumNames.forEach(e => (enums.indexOf(e) === -1) && enums.push(e));
        if (enums.indexOf(this.props.name) === -1) {
            enums.push(this.props.name);
        }
        this.name = enums.join(' / ');
        this.collectState = null;
        this.collectTimer = null;

        this.componentReady();
    }

    setMaxHeight(states) {
        let maxHeight = 0;
        states = states || this.state;

        this.divs = {
            'header':  {height: HEIGHT_HEADER,  visible: true},
            'current': {height: HEIGHT_CURRENT, visible: true},
            'chart':   {height: HEIGHT_CHART,
                visible: states && states[this.ids.current.chart] && !states[this.ids.current.chart].match(/\.html$|\.htm/)}
        };
        for (let d = 0; d < this.ids.days.length; d++) {
            if (this.ids.days[d]) {
                this.divs['day' + d] = {height: HEIGHT_DAY, visible: true};
            }
        }
        // calculate positions
        for (const name in this.divs) {
            if (this.divs.hasOwnProperty(name) && this.divs[name].visible) {
                maxHeight += this.divs[name].height + 16;
            }
        }

        if (this.dialogStyle.maxHeight !== maxHeight) {
            this.dialogStyle = {maxHeight: maxHeight};
        }
    }

    onUpdateTimer() {
        this.collectTimer = null;
        if (this.collectState) {
            this.setMaxHeight(this.collectState);
            this.setState(this.collectState);
            this.collectState = null;
        }
    }

    updateState(id, state) {
        for (let d = 0; d < this.ids.days.length; d++) {
            if (!this.ids.days[d]) continue;
            if (id === this.ids.days[d].temperature ||
                id === this.ids.days[d].humidity ||
                id === this.ids.days[d].humidityMin ||
                id === this.ids.days[d].humidityMax ||
                id === this.ids.days[d].windChill ||
                id === this.ids.days[d].windSpeed ||
                id === this.ids.days[d].temperatureMin ||
                id === this.ids.days[d].temperatureMax ||
                id === this.ids.days[d].precipitation ||
                id === this.ids.days[d].pressure) {
                const val = Math.round(parseFloat(state.val));
                if (!isNaN(val)) {
                    this.collectState = this.collectState || {};
                    this.collectState[id] = val;
                    this.collectTimer && clearTimeout(this.collectTimer);
                    this.collectTimer = setTimeout(() => this.onUpdateTimer(), 200);
                }
                return;
            } else
            if (id === this.ids.days[d].icon ||
                id === this.ids.days[d].state) {
                this.collectState = this.collectState || {};
                this.collectState[id] = state.val || '';
                this.collectTimer && clearTimeout(this.collectTimer);
                this.collectTimer = setTimeout(() => this.onUpdateTimer(), 200);
                return;
            } else
            if (id === this.ids.days[d].icon ||
                id === this.ids.days[d].state ||
                id === this.ids.days[d].windIcon) {
                this.collectState = this.collectState || {};
                this.collectState[id] = state.val || '';
                this.collectTimer && clearTimeout(this.collectTimer);
                this.collectTimer = setTimeout(() => this.onUpdateTimer(), 200);
                return;
            } else if (id === this.ids.days[d].windDirection) {
                let dir = '';
                if (state && state.val !== null && state.val !== '' && state.val !== undefined && (typeof state.val === 'number' || parseInt(state.val, 10).toString() === state.val.toString())) {
                    dir = I18n.t('wind_' + Utils.getWindDirection(state.val)).replace('wind_', '');
                } else {
                    dir = state.val;
                }

                this.collectState = this.collectState || {};
                this.collectState[id] = dir;
                this.collectTimer && clearTimeout(this.collectTimer);
                this.collectTimer = setTimeout(() => this.onUpdateTimer(), 200);
                return;
            }  else if (id === this.ids.days[d].date) {
                let date = '';

                if (state && state.val) {
                    date = Utils.date2string(state.val) || '';
                }

                this.collectState = this.collectState || {};
                this.collectState[id] = date;
                this.collectTimer && clearTimeout(this.collectTimer);
                this.collectTimer = setTimeout(() => this.onUpdateTimer(), 200);
                return;
            }
        }

        if (id === this.ids.current.temperature ||
            id === this.ids.current.humidity ||
            id === this.ids.current.windChill ||
            id === this.ids.current.windSpeed ||
            id === this.props.settings.tempID ||
            id === this.props.settings.humidityID ||
            id === this.ids.current.temperatureMin ||
            id === this.ids.current.temperatureMax ||
            id === this.ids.current.precipitation ||
            id === this.ids.current.pressure) {
            const val = Math.round(parseFloat(state.val));
            if (!isNaN(val)) {
                this.collectState = this.collectState || {};
                this.collectState[id] = val;
                this.collectTimer && clearTimeout(this.collectTimer);
                this.collectTimer = setTimeout(() => this.onUpdateTimer(), 200);
            }
        } else
        if (id === this.ids.current.icon ||
            id === this.ids.current.history ||
            id === this.ids.current.chart ||
            id === this.ids.current.state ||
            id === this.ids.current.windIcon) {
            this.collectState = this.collectState || {};
            this.collectState[id] = state.val || '';
            this.collectTimer && clearTimeout(this.collectTimer);
            this.collectTimer = setTimeout(() => this.onUpdateTimer(), 200);
        }  else
        if (this.ids.current.location && this.ids.current.location.indexOf(id) !== -1) {
            this.collectState = this.collectState || {};
            if (state.val && state.val.replace(/[,.-]/g, '').trim()) {
                this.collectState.location = state.val || '';
            }
            this.collectTimer && clearTimeout(this.collectTimer);
            this.collectTimer = setTimeout(() => this.onUpdateTimer(), 200);
        } else if (id === this.ids.current.windDirection) {
            let dir = '';
            if (state && state.val !== null && state.val !== '' && state.val !== undefined && (typeof state.val === 'number' || parseInt(state.val, 10).toString() === state.val.toString())) {
                dir = I18n.t('wind_' + Utils.getWindDirection(state.val)).replace('wind_', '');
            } else {
                dir = state.val;
            }

            this.collectState = this.collectState || {};
            this.collectState[id] = dir;
            this.collectTimer && clearTimeout(this.collectTimer);
            this.collectTimer = setTimeout(() => this.onUpdateTimer(), 200);
        }  else if (id === this.ids.current.date) {
            let date = '';

            if (state && state.val) {
                date = Utils.date2string(state.val) || '';
            }

            this.collectState = this.collectState || {};
            this.collectState[id] = date;
            this.collectTimer && clearTimeout(this.collectTimer);
            this.collectTimer = setTimeout(() => this.onUpdateTimer(), 200);
        } else {
            console.log(id + ' => ' + state.val);
            super.updateState(id, state);
        }
    }

    getHeaderDiv() {
        if (!this.divs.header.visible) return null;
        return (<div key="header" className={this.props.classes['header-div']}>{this.name}</div>);
    }

    getDayIconDiv(d) {
        const classes = this.props.classes;
        const temp = this.ids.days[d].temperature && this.state[this.ids.days[d].temperature];
        const icon = this.ids.days[d].icon && this.state[this.ids.days[d].icon];

        if (!temp && !icon) return null;

        return (<div  key={'dayIcon' + d} className={classes['dayIcon-div']}>
            {icon ? (<img className={classes['dayIcon-icon']} src={icon} alt={this.state[this.ids.days[d].state] || ''}/>) : null}
            {temp !== null && temp !== undefined ? (<div className={classes['dayIcon-temperature']}>{temp}°</div>) : null}
        </div>);
    }

    getDayDateDiv(d) {
        const classes = this.props.classes;
        let date = this.ids.days[d].date && this.state[this.ids.days[d].date];
        if (!date) {
            const now = new Date();
            now.setDate(now.getDate() + d);
            date = Utils.date2string(now);
        }

        return (<div key={'location' + d} className={classes['dayDate-div']}>
            <div className={classes['dayDate-date']}>{date}</div>
        </div>);
    }

    getDayWindDiv(d) {
        const classes = this.props.classes;
        let windChill = this.ids.days[d].windchill && this.state[this.ids.days[d].date];
        let windDir   = this.ids.days[d].windDirection && this.state[this.ids.days[d].windDirection];
        if (windDir !== null && windDir !== undefined && (typeof windDir === 'number' || parseInt(windDir, 10) === windDir)) {
            windDir = I18n.t('wind_' + Utils.getWindDirection(windDir)).replace('wind_', '');
        }
        let windSpeed = this.ids.days[d].windSpeed && this.state[this.ids.days[d].windSpeed];
        let windIcon = this.ids.days[d].windIcon && this.state[this.ids.days[d].windIcon];

        let state = this.ids.days[d].state && this.state[this.ids.days[d].state];

        if (!state && !windChill && windChill !== 0 && !windDir && !windSpeed && windSpeed !== 0) {
            return null;
        }

        return (<div key={'dayWind' + d} className={classes['dayState-div']}>

            {windChill !== null && windChill !== undefined ?
                (<div key={'windChill' + d} className={classes['dayState-windChill']}>
                    <span className={classes['dayState-windChillTitle']}>{I18n.t('Windchill')}: </span>
                    <span className={classes['dayState-windChillValue']}>{windChill}</span>
                </div>)
                : null}

            {(windDir !== null && windDir !== undefined) || (windSpeed !== null && windSpeed !== undefined) ?
                (<div key={'wind' + d} className={classes['dayState-wind']}>
                    <span key={'windTitle' + d} className={classes['dayState-windTitle']}>{I18n.t('Wind')}:</span>
                    {windIcon ? (<img className={classes['dayState-windIcon']} src={windIcon} alt="state"/>) : null}
                    {windDir ? (<span className={classes['dayState-windDir']}>{windDir}</span>) : null}
                    {windSpeed !== null && windSpeed !== undefined && !isNaN(windSpeed) ? (<span key={'daySpeed' + d} className={classes['dayState-windSpeed']}>{windSpeed}{this.props.windUnit}</span>) : null}
                </div>)
                : null}

            {state ? (<div key={'state' + d} className={classes['dayState-state']}>{state}</div>) : null}
        </div>);
    }

    getDayTempDiv(d) {
        const classes = this.props.classes;
        let tempMin = this.ids.days[d].temperatureMin && this.state[this.ids.days[d].temperatureMin];
        let tempMax = this.ids.days[d].temperatureMax && this.state[this.ids.days[d].temperatureMax];
        let precipitation = this.ids.days[d].precipitation && this.state[this.ids.days[d].precipitation];
        let pressure = this.ids.days[d].pressure && this.state[this.ids.days[d].pressure];
        let humidity = this.ids.days[d].humidity && this.state[this.ids.days[d].humidity];

        if (!humidity && humidity !== 0 &&
            this.ids.current.humidity &&
            this.props.objects[this.ids.current.humidity] &&
            this.props.objects[this.ids.current.humidity].common &&
            this.props.objects[this.ids.current.humidity].common.role &&
            this.props.objects[this.ids.current.humidity].common.role.indexOf('forecast.0') !== -1) {
            humidity = this.state[this.ids.current.humidity];
        }
        if (!tempMin && tempMin !== 0 &&
            this.ids.current.temperatureMin) {
            const obj = this.props.objects[this.ids.current.temperatureMin];
            if (obj &&
                obj.common &&
                obj.common.role &&
                obj.common.role.indexOf('forecast.0') !== -1) {
                tempMin = this.state[this.ids.current.temperatureMin];
            }
        }
        if (!tempMax && tempMax !== 0 &&
            this.ids.current.temperatureMax) {
            const obj = this.props.objects[this.ids.current.temperatureMax];
            if (obj &&
                obj.common &&
                obj.common.role &&
                obj.common.role.indexOf('forecast.0') !== -1) {
                tempMax = this.state[this.ids.current.temperatureMax];
            }
        }

        let temp;
        if (tempMin !== null && tempMin !== undefined &&
            tempMax !== null && tempMax !== undefined && tempMin !== tempMax) {
            temp = [
                (<span key="max" className={classes['dayTemp-temperatureMax']}>{tempMax}°</span>),
                (<span key="mid"> / </span>),
                (<span key="min" className={classes['dayTemp-temperatureMin']}>{tempMin}°</span>)
            ];
        } else if (
            (tempMin !== null && tempMin !== undefined) ||
            (tempMax !== null && tempMax !== undefined)) {
            if (tempMin === null || tempMin === undefined) {
                tempMin = tempMax;
            }
            temp = (<span key="max" className={classes['dayTemp-temperatureMax']}>{tempMin}°</span>);
        }

        if (!temp &&
            !precipitation && precipitation !== 0 &&
            !pressure && pressure !== 0 &&
            !humidity && humidity !== 0) {
            return null;
        }

        return (<div key={'dayTemp' + d} className={classes['dayTemp-div']}>
            {temp !== null && temp !== undefined ?
                (<div key={'temp' + d} className={classes['dayTemp-temperature']}>
                    <span className={classes['dayTemp-temperatureValue']}>{temp}</span>
                </div>)
                : null}

            {precipitation !== null && precipitation !== undefined ?
                (<div key={'precipitation' + d} className={classes['dayTemp-precipitation']}>
                    <span key={'windTitle' + d} className={classes['dayTemp-precipitationTitle']}>{I18n.t('Precip.')}:</span>
                    <span className={classes['dayTemp-precipitationValue']}>{precipitation}%</span>
                </div>)
                : null}

            {humidity !== null && humidity !== undefined ?
                (<div key={'humidity' + d} className={classes['dayTemp-humidity']}>
                    <span key={'windTitle' + d} className={classes['dayTemp-humidityTitle']}>{I18n.t('Humidity')}:</span>
                    <span className={classes['dayTemp-humidityValue']}>{precipitation}%</span>
                </div>)
                : null}
            {pressure !== null && pressure !== undefined ?
                (<div key={'pressure' + d} className={classes['dayTemp-pressure']}>
                    <span key={'windTitle' + d} className={classes['dayTemp-pressureTitle']}>{I18n.t('Pressure')}:</span>
                    <span className={classes['dayTemp-pressureValue']}>{pressure}{this.props.pressureUnit}</span>
                </div>)
                : null}
        </div>);
    }

    getDayDiv(d) {
        if (!this.ids.days[d]) return null;
        let parts = [
            this.getDayIconDiv(d),
            this.getDayDateDiv(d),
            this.getDayWindDiv(d),
            this.getDayTempDiv(d),
        ];
        if (!parts[0] && !parts[2] && !parts[3]) {
            return null;
        }

        return (<Paper key={'day' + d} className={this.props.classes['day-div']}>{parts}</Paper>);
    }

    getCurrentIconDiv() {
        const classes = this.props.classes;
        let temp;
        temp = this.props.settings.tempID && this.state[this.props.settings.tempID];
        if (!temp && temp !== 0) {
            temp = this.ids.current.temperature && this.state[this.ids.current.temperature];
        }

        return (<div  key="todayIcon" className={classes['currentIcon-div']}>
            <img className={classes['currentIcon-icon']} src={this.state[this.ids.current.icon]} alt={this.state[this.ids.current.state] || ''}/>
            {temp !== null && temp !== undefined ? (<div className={classes['currentIcon-temperature']}>{temp}°</div>) : null}
        </div>);
    }

    getCurrentDateLocationDiv() {
        const classes = this.props.classes;
        let date = this.ids.current.date && this.state[this.ids.current.date];
        let location = this.props.settings.locationText;
        location = location || this.state.location;
        location = location || I18n.t('Weather');
        date = date || Utils.date2string(new Date());

        return (<div key="location" className={classes['currentDate-div']}>
            <div className={classes['currentDate-date']}>{date},</div>
            <div className={classes['currentDate-location']}>{location}</div>
        </div>);
    }

    getTodayWindDiv() {
        const classes = this.props.classes;
        let windChill = this.ids.current.windchill && this.state[this.ids.current.date];
        let windDir = this.ids.current.windDirection && this.state[this.ids.current.windDirection];
        if (windDir !== null && windDir !== undefined && (typeof windDir === 'number' || parseInt(windDir, 10) === windDir)) {
            windDir = I18n.t('wind_' + Utils.getWindDirection(windDir)).replace('wind_', '');
        }
        let windSpeed = this.ids.current.windSpeed && this.state[this.ids.current.windSpeed];
        let windIcon = this.ids.current.windIcon && this.state[this.ids.current.windIcon];
        let humidity = this.props.settings.humidityID && this.state[this.props.settings.humidityID];
        if (!humidity && humidity !== 0) {
            humidity = this.ids.current.humidity && this.state[this.ids.current.humidity];
        }

        let state = this.ids.current.state && this.state[this.ids.current.state];
        return (<div key="todayWind" className={classes['todayState-div']}>

            {windChill !== null && windChill !== undefined ?
                (<div key="windChill" className={classes['todayState-windChill']}>
                    <span className={classes['todayState-windChillTitle']}>{I18n.t('Windchill')}: </span>
                    <span className={classes['todayState-windChillValue']}>{windChill}</span>
                </div>)
                : null}

            {(windDir !== null && windDir !== undefined) || (windSpeed !== null && windSpeed !== undefined) ?
                (<div key="wind" className={classes['todayState-wind']}>
                    <span key="windTitle" className={classes['todayState-windTitle']}>{I18n.t('Wind')}:</span>
                    {windIcon ? (<img className={classes['todayState-windIcon']} src={windIcon} alt="state"/>) : null}
                    {windDir ? (<span className={classes['todayState-windDir']}>{windDir}</span>) : null}
                    {windSpeed !== null && windSpeed !== undefined && !isNaN(windSpeed) ? (<span key="windSpeed" className={classes['todayState-windSpeed']}>{windSpeed}{this.props.windUnit}</span>) : null}
                </div>)
                : null}

            {humidity || humidity === 0 ?
                (<div key="humidity" className={classes['todayState-humidity']}>
                    <span className={classes['todayState-humidityTitle']}>{I18n.t('Humidity')}: </span>
                    <span className={classes['todayState-humidityValue']}>{humidity}%</span>
                </div>)
                : null}

            {state ? (<div key="state" className={classes['todayState-state']}>{state}</div>) : null}
        </div>);
    }

    getTodayTempDiv() {
        const classes = this.props.classes;
        let tempMin = this.ids.current.temperatureMin && this.state[this.ids.current.temperatureMin];
        let tempMax = this.ids.current.temperatureMax && this.state[this.ids.current.temperatureMax];
        let precipitation = this.ids.current.precipitation && this.state[this.ids.current.precipitation];
        let pressure = this.ids.current.pressure && this.state[this.ids.current.pressure];

        let temp;
        if (tempMin !== null && tempMin !== undefined &&
            tempMax !== null && tempMax !== undefined) {
            temp = [
                (<span key="max" className={classes['todayTemp-temperatureMax']}>{tempMax}°</span>),
                (<span key="mid"> / </span>),
                (<span key="min" className={classes['todayTemp-temperatureMin']}>{tempMin}°</span>)
            ];
        }

        return (<div key="todayTemp" className={classes['todayTemp-div']}>
            {temp !== null && temp !== undefined ?
                (<div key="temp" className={classes['todayTemp-temperature']}>
                    <span className={classes['todayTemp-temperatureValue']}>{temp}</span>
                </div>)
                : null}

            {precipitation !== null && precipitation !== undefined ?
                (<div key="precipitation" className={classes['todayTemp-precipitation']}>
                    <span key="windTitle" className={classes['todayTemp-precipitationTitle']}>{I18n.t('Precip.')}:</span>
                    <span className={classes['todayTemp-precipitationValue']}>{precipitation}%</span>
                </div>)
                : null}

            {pressure !== null && pressure !== undefined ?
                (<div key="pressure" className={classes['todayTemp-pressure']}>
                    <span key="windTitle" className={classes['todayTemp-pressureTitle']}>{I18n.t('Pressure')}:</span>
                    <span className={classes['todayTemp-pressureValue']}>{pressure}{this.props.pressureUnit}</span>
                </div>)
                : null}
        </div>);
    }

    getChartDiv() {
        const classes = this.props.classes;
        let chart = this.ids.current.chart && this.state[this.ids.current.chart];
        if (chart && chart.toLowerCase().match(/\.svg$|\.jpg$|\.jpeg$|\.gif$|\.png$/)) {
            if (chart.indexOf('?') === -1) {
                chart += '?ts=' + Date.now();
            } else {
                chart += '&ts=' + Date.now();
            }
            return [
                (<Paper key="chart" className={this.props.classes['chart-div']} onClick={() => this.setState({chartOpened: true})}>
                    <div className={classes['chart-header']}>{I18n.t('Chart')}</div>
                    <img className={classes['chart-img']} src={this.state[this.ids.current.chart]} alt={I18n.t('Chart')}/>
                </Paper>),
                this.state.chartOpened ? (<Dialog
                        key="chart-dialog"
                        open={true}
                        classes={{paper: this.props.classes['chart-dialog-paper']}}
                        onClose={() => this.setState({chartOpened: false})}
                        className={this.props.classes['chart-dialog']}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{I18n.t('Chart')}</DialogTitle>
                        <DialogContent className={this.props.classes['chart-dialog-content']}>
                            <img className={classes['chart-dialog-img']} src={chart} alt={I18n.t('Chart')}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.setState({chartOpened: false})} color="primary" autoFocus>{I18n.t('Close')}</Button>
                        </DialogActions>
                    </Dialog>) : null];
        } else {
            return null;
        }
    }

    getDaysDiv() {
        let days = this.ids.days.map(function (day, d) {
            if (!d && this.props.settings.hideFirstDay) return null;
            return day && this.getDayDiv(d);
        }.bind(this));
        if (this.props.settings.chartLast) {
            days.push(this.getChartDiv());
        } else {
            days.unshift(this.getChartDiv());
        }
        days = days.filter(day => day);
        if (days.length) {
            return (<div key="allDays" className={this.props.classes['days-div']}>{days}</div>);
        } else {
            return null;
        }
    }

    onOpenHistory() {
        if (this.ids.current.chart && this.state[this.ids.current.chart]) {
            const win = window.open(this.state[this.ids.current.chart], '_blank');
            win.focus();
        }
    }

    getCurrentDiv() {
        return (
            <Paper key="current"
                   className={this.props.classes['current-div']}
                   style={this.ids.current.chart && this.state[this.ids.current.chart] ? {cursor: 'pointer'} : {}}
                   onClick={() => this.onOpenHistory()}>
                {this.getCurrentIconDiv()}
                {this.getCurrentDateLocationDiv()}
                {this.getTodayWindDiv()}
                {this.getTodayTempDiv()}
            </Paper>);
    }

    generateContent() {
        return [
            this.getHeaderDiv(),
            this.getCurrentDiv(),
            this.getDaysDiv()
        ];
    }
}

export default withStyles(styles)(SmartDialogWeatherForecast);